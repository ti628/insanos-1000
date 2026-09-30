import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  getDocFromServer,
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };
import { REGIONAIS_DIVISOES, REGIONAIS, GRAUS } from './bonde-data.js';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase: client is offline or configuration needs check');
    }
  }
}

export function normalizeStr(str) {
  return (str || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_');
}

export function makeDocId(nome, nomeColete, regional, divisao) {
  const rawKey = `${normalizeStr(nome)}_${normalizeStr(nomeColete)}_${normalizeStr(regional)}_${normalizeStr(divisao)}`;
  let hash = 0;
  for (let i = 0; i < rawKey.length; i++) {
    hash = ((hash << 5) - hash) + rawKey.charCodeAt(i);
    hash |= 0;
  }
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
  const prefix = rawKey.slice(0, 70).replace(/^_|_$/g, '');
  return `p_${prefix}_${hexHash}`.slice(0, 110);
}

export const GRAUS_SEM_DIVISAO = ['Regional V', 'Grau IV', 'Brasil III'];

export function isDivisaoObrigatoria(grau) {
  if (!grau) return true;
  return !GRAUS_SEM_DIVISAO.includes(grau.trim());
}

export async function confirmarPresenca({ nome, nomeColete, regional, divisao, grau }) {
  const grauTrim = (grau || '').trim();
  const precisaDivisao = isDivisaoObrigatoria(grauTrim);
  const divisaoFinal = (divisao || '').trim();

  if (!nome || !nomeColete || !regional || !grauTrim || (precisaDivisao && !divisaoFinal)) {
    if (precisaDivisao && !divisaoFinal) {
      return { success: false, error: 'O campo Divisão é obrigatório para este grau.' };
    }
    return { success: false, error: 'Todos os campos obrigatórios devem ser preenchidos.' };
  }

  const docId = makeDocId(nome, nomeColete, regional, divisaoFinal);
  const docRef = doc(db, 'bonde_1000', docId);

  try {
    const existingSnap = await getDoc(docRef);
    if (existingSnap.exists()) {
      return { success: false, error: 'Esta presença já foi registrada.' };
    }
  } catch (err) {
    console.warn('Verificação de duplicidade:', err);
  }

  const now = new Date();
  const dataHoraConfirmacao = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Sao_Paulo'
  });

  const payload = {
    nome: nome.trim(),
    nomeColete: nomeColete.trim(),
    regional: regional.trim(),
    divisao: divisaoFinal,
    grau: grauTrim,
    evento: '1º Bonde das 1000 Motos',
    dataEvento: '10/10/2026',
    horarioSaida: '10:00',
    localConcentracao: 'PE Avenida Deputado Aníbal Khury',
    dataHoraConfirmacao,
    lookupKey: `${normalizeStr(nome)}_${normalizeStr(nomeColete)}_${normalizeStr(regional)}_${normalizeStr(divisaoFinal)}`
  };

  try {
    await setDoc(docRef, payload);
    return { success: true, data: payload, id: docId };
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, `bonde_1000/${docId}`);
  }
}

export async function listarParticipantes() {
  try {
    const colRef = collection(db, 'bonde_1000');
    const snapshot = await getDocs(colRef);
    const list = [];
    snapshot.forEach(docSnap => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    list.sort((a, b) => (a.nome || '').localeCompare(b.nome || '', 'pt-BR'));
    return list;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'bonde_1000');
  }
}

export async function excluirParticipante(id) {
  try {
    const docRef = doc(db, 'bonde_1000', id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `bonde_1000/${id}`);
  }
}

export function exportarExcel(participantes, nomeArquivo = 'bonde_1000_participantes.xlsx') {
  const dados = participantes.map((p, idx) => ({
    'Nº': idx + 1,
    'Nome': p.nome || '',
    'Nome de Colete': p.nomeColete || '',
    'Regional': p.regional || '',
    'Divisão': p.divisao || '',
    'Grau': p.grau || '',
    'Data/Hora da confirmação': p.dataHoraConfirmacao || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(dados);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 30 },
    { wch: 25 },
    { wch: 30 },
    { wch: 30 },
    { wch: 20 },
    { wch: 25 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Participantes');
  XLSX.writeFile(workbook, nomeArquivo);
}

export function exportarPDF(participantes, nomeArquivo = 'bonde_1000_participantes.pdf') {
  const pdfDoc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  pdfDoc.setFont('helvetica', 'bold');
  pdfDoc.setFontSize(18);
  pdfDoc.setTextColor(32, 30, 29);
  pdfDoc.text('1º BONDE DAS 1000 MOTOS', 14, 18);

  pdfDoc.setFont('helvetica', 'normal');
  pdfDoc.setFontSize(12);
  pdfDoc.setTextColor(96, 93, 93);
  pdfDoc.text('Lista de participantes confirmados', 14, 25);

  docDate(pdfDoc);

  const tableData = participantes.map((p, idx) => [
    idx + 1,
    p.nome || '',
    p.nomeColete || '',
    p.regional || '',
    p.divisao || '',
    p.grau || '',
    p.dataHoraConfirmacao || ''
  ]);

  pdfDoc.autoTable({
    startY: 36,
    head: [['Nº', 'Nome', 'Nome de Colete', 'Regional', 'Divisão', 'Grau', 'Data/Hora']],
    body: tableData,
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 2.5,
      textColor: [32, 30, 29],
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [0, 136, 176],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [248, 244, 244]
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 35 },
      2: { cellWidth: 28 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 },
      5: { cellWidth: 22 },
      6: { cellWidth: 25 }
    },
    margin: { left: 10, right: 10 }
  });

  const finalY = pdfDoc.lastAutoTable.finalY || 40;
  pdfDoc.setFont('helvetica', 'bold');
  pdfDoc.setFontSize(12);
  pdfDoc.setTextColor(0, 103, 134);
  pdfDoc.text(`TOTAL DE PARTICIPANTES: ${participantes.length}`, 14, finalY + 12);

  pdfDoc.save(nomeArquivo);
}

function docDate(doc) {
  doc.setFontSize(10);
  doc.text('Data: 10 de outubro de 2026', 14, 31);
}

export async function loginAdmin(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  return await signOut(auth);
}

export function onAdminAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export { REGIONAIS_DIVISOES, REGIONAIS, GRAUS };

testConnection();
