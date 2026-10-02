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
import { REGIONAIS_DIVISOES, REGIONAIS, GRAUS, CARGOS_GRAU_I, COMANDOS_GRAU_II, COMANDOS_GRAU_III } from './bonde-data.js';

export { REGIONAIS_DIVISOES, REGIONAIS, GRAUS, CARGOS_GRAU_I, COMANDOS_GRAU_II, COMANDOS_GRAU_III };

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

export function isParticipantConvidado(data, docId = '') {
  if (!data) return false;

  const tipo = String(data.tipoParticipante || data.tipo || '').trim().toLowerCase();
  if (tipo === 'convidado' || tipo === 'convidados' || tipo.includes('convid')) return true;

  const grau = String(data.grau || '').trim().toLowerCase();
  if (grau === 'convidado' || grau === 'convidados' || grau.includes('convid')) return true;

  const regional = String(data.regional || '').trim().toLowerCase();
  if (regional === 'convidado' || regional === 'convidados' || regional.includes('convid')) return true;

  const divisao = String(data.divisao || '').trim().toLowerCase();
  if (divisao === 'convidado' || divisao === 'convidados' || divisao.includes('convid')) return true;

  const colete = String(data.nomeColete || '').trim().toLowerCase();
  if (colete === 'convidado' || colete === 'convidados' || colete.includes('convid')) return true;

  const mc = String(data.motoclube || '').trim().toLowerCase();
  if (mc !== '' && mc !== 'insanos mc' && mc !== 'insanos' && mc !== 'insanos m.c.' && mc !== 'insanos motoclube') return true;

  const id = String(docId || data.id || '').toLowerCase();
  if (id.startsWith('p_conv_') || id.startsWith('conv_') || id.includes('convid') || id.includes('_conv_')) return true;

  const key = String(data.lookupKey || '').toLowerCase();
  if (key.startsWith('conv_') || key.includes('convid') || key.includes('_conv_')) return true;

  if (!data.nomeColete && !data.regional && (!data.grau || data.grau === 'Convidado') && data.motoclube) return true;
  return false;
}

export { isParticipantConvidado as isConvidado };

export function makeDocId(param1, nomeColete, regional, divisao) {
  let rawKey = '';
  if (typeof param1 === 'object' && param1 !== null) {
    const { tipoParticipante, nome, nomeColete: nc, regional: reg, divisao: div, motoclube } = param1;
    if (isParticipantConvidado(param1)) {
      rawKey = `conv_${normalizeStr(nome)}_${normalizeStr(motoclube)}`;
    } else {
      rawKey = `${normalizeStr(nome)}_${normalizeStr(nc)}_${normalizeStr(reg)}_${normalizeStr(div)}`;
    }
  } else {
    rawKey = `${normalizeStr(param1)}_${normalizeStr(nomeColete)}_${normalizeStr(regional)}_${normalizeStr(divisao)}`;
  }
  let hash = 0;
  for (let i = 0; i < rawKey.length; i++) {
    hash = ((hash << 5) - hash) + rawKey.charCodeAt(i);
    hash |= 0;
  }
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
  const prefix = rawKey.slice(0, 70).replace(/^_|_$/g, '');
  return `p_${prefix}_${hexHash}`.slice(0, 110);
}

export function getGrauCategory(grau) {
  const g = (grau || '').trim();
  if (g === 'Grau I' || g === 'I') return 'I';
  if (g === 'Grau II' || g === 'II') return 'II';
  if (g === 'Brasil III' || g === 'Grau III' || g === 'III') return 'III';
  if (g === 'Grau IV' || g === 'IV') return 'IV';
  if (g === 'Regional V' || g === 'Grau V' || g === 'V') return 'V';
  return 'OUTRO';
}

export function isDivisaoObrigatoria(grau) {
  return getGrauCategory(grau) === 'OUTRO';
}

export function isRegionalObrigatoria(grau) {
  const cat = getGrauCategory(grau);
  return cat === 'V' || cat === 'OUTRO';
}

export function isRegionalAplicavel(grau) {
  const cat = getGrauCategory(grau);
  return cat === 'IV' || cat === 'V' || cat === 'OUTRO';
}

export function isDivisaoAplicavel(grau) {
  const cat = getGrauCategory(grau);
  return cat === 'IV' || cat === 'OUTRO';
}

export async function confirmarPresenca({
  tipoParticipante = 'Membro Insanos',
  nome,
  nomeColete = '',
  regional = '',
  divisao = '',
  grau = '',
  cargoFuncao = '',
  comandoInternacional = '',
  comandoPasta = '',
  motoclube = ''
}) {
  const isConvidado = isParticipantConvidado({ tipoParticipante, motoclube, nomeColete, regional, grau });
  const nomeTrim = (nome || '').trim();

  let docId = '';
  let payload = {};

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

  if (isConvidado) {
    const motoclubeTrim = (motoclube || '').trim();
    if (!nomeTrim || !motoclubeTrim) {
      return { success: false, error: 'Por favor, preencha o Nome e o Motoclube.' };
    }

    docId = makeDocId({ tipoParticipante: 'Convidado', nome: nomeTrim, motoclube: motoclubeTrim });
    payload = {
      tipoParticipante: 'Convidado',
      nome: nomeTrim,
      nomeColete: '',
      motoclube: motoclubeTrim,
      regional: '',
      divisao: '',
      grau: 'Convidado',
      cargoFuncao: '',
      comandoInternacional: '',
      comandoPasta: '',
      evento: '1º Bonde das 1000 Motos',
      dataEvento: '10/10/2026',
      horarioSaida: '10:00',
      localConcentracao: 'PE Avenida Deputado Aníbal Khury',
      dataHoraConfirmacao,
      lookupKey: `conv_${normalizeStr(nomeTrim)}_${normalizeStr(motoclubeTrim)}`
    };
  } else {
    const nomeColeteTrim = (nomeColete || '').trim();
    const grauTrim = (grau || '').trim();
    const regionalTrim = (regional || '').trim();
    const divisaoTrim = (divisao || '').trim();
    const cargoFuncaoTrim = (cargoFuncao || '').trim();
    const comandoInternacionalTrim = (comandoInternacional || '').trim();
    const comandoPastaTrim = (comandoPasta || '').trim();

    if (!nomeTrim || !nomeColeteTrim || !grauTrim) {
      return { success: false, error: 'Por favor, preencha todos os campos obrigatórios.' };
    }

    const cat = getGrauCategory(grauTrim);

    if (cat === 'I' && !cargoFuncaoTrim) {
      return { success: false, error: 'O campo Cargo / Função é obrigatório para o Grau I.' };
    }
    if (cat === 'II' && !comandoInternacionalTrim) {
      return { success: false, error: 'O campo Comando Internacional / Continental é obrigatório para o Grau II.' };
    }
    if (cat === 'III' && !comandoPastaTrim) {
      return { success: false, error: 'O campo Comando / Pasta é obrigatório para o Grau III.' };
    }
    if ((cat === 'V' || cat === 'OUTRO') && !regionalTrim) {
      return { success: false, error: 'O campo Regional é obrigatório.' };
    }
    if (cat === 'OUTRO' && !divisaoTrim) {
      return { success: false, error: 'O campo Divisão é obrigatório para este grau.' };
    }

    const finalRegional = (cat === 'I' || cat === 'II' || cat === 'III') ? '' : regionalTrim;
    const finalDivisao = (cat === 'I' || cat === 'II' || cat === 'III' || cat === 'V') ? '' : divisaoTrim;

    docId = makeDocId({
      tipoParticipante: 'Membro Insanos',
      nome: nomeTrim,
      nomeColete: nomeColeteTrim,
      regional: finalRegional,
      divisao: finalDivisao
    });

    payload = {
      tipoParticipante: 'Membro Insanos',
      nome: nomeTrim,
      nomeColete: nomeColeteTrim,
      regional: finalRegional,
      divisao: finalDivisao,
      grau: grauTrim,
      cargoFuncao: cat === 'I' ? cargoFuncaoTrim : '',
      comandoInternacional: cat === 'II' ? comandoInternacionalTrim : '',
      comandoPasta: cat === 'III' ? comandoPastaTrim : '',
      evento: '1º Bonde das 1000 Motos',
      dataEvento: '10/10/2026',
      horarioSaida: '10:00',
      localConcentracao: 'PE Avenida Deputado Aníbal Khury',
      dataHoraConfirmacao,
      lookupKey: `${normalizeStr(nomeTrim)}_${normalizeStr(nomeColeteTrim)}_${normalizeStr(finalRegional)}_${normalizeStr(finalDivisao)}`
    };
  }

  const docRef = doc(db, 'bonde_1000', docId);

  try {
    const existingSnap = await getDoc(docRef);
    if (existingSnap.exists()) {
      return { success: false, error: 'Esta presença já foi registrada.' };
    }
  } catch (err) {
    console.warn('Verificação de duplicidade:', err);
  }

  try {
    await setDoc(docRef, payload);
    const returnData = {
      ...payload,
      tipoParticipante: isConvidado ? 'Convidado' : 'Membro Insanos',
      motoclube: isConvidado ? (payload.motoclube || '') : 'Insanos MC',
      nomeColete: isConvidado ? '' : payload.nomeColete,
      regional: payload.regional,
      divisao: payload.divisao,
      grau: isConvidado ? 'Convidado' : payload.grau,
      cargoFuncao: payload.cargoFuncao,
      comandoInternacional: payload.comandoInternacional,
      comandoPasta: payload.comandoPasta
    };
    return { success: true, data: returnData, id: docId };
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
      const data = docSnap.data();
      const isConv = isParticipantConvidado(data, docSnap.id);
      list.push({
        id: docSnap.id,
        ...data,
        tipoParticipante: isConv ? 'Convidado' : (data.tipoParticipante || 'Membro Insanos'),
        motoclube: isConv ? (data.motoclube || data.nomeColete || 'Sem Clube') : (data.motoclube || 'Insanos MC'),
        nome: data.nome || '',
        nomeColete: isConv ? '' : (data.nomeColete || ''),
        regional: isConv ? '' : (data.regional || ''),
        divisao: isConv ? '' : (data.divisao || ''),
        grau: isConv ? 'Convidado' : (data.grau || ''),
        cargoFuncao: isConv ? '' : (data.cargoFuncao || ''),
        comandoInternacional: isConv ? '' : (data.comandoInternacional || ''),
        comandoPasta: isConv ? '' : (data.comandoPasta || ''),
        dataHoraConfirmacao: data.dataHoraConfirmacao || ''
      });
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
  const dados = participantes.map((p, idx) => {
    const isConv = isParticipantConvidado(p, p.id);
    const cargoExtra = p.cargoFuncao || p.comandoInternacional || p.comandoPasta || '';
    const grauFormatado = isConv ? 'Convidado' : (p.grau ? (cargoExtra ? `${p.grau} (${cargoExtra})` : p.grau) : '-');
    return {
      'Nº': idx + 1,
      'Tipo': isConv ? 'Convidado' : 'Membro Insanos',
      'Nome': p.nome || '',
      'Nome de Colete': isConv ? '-' : (p.nomeColete || '-'),
      'Motoclube': isConv ? (p.motoclube || 'Sem Clube') : 'Insanos MC',
      'Regional': isConv ? 'Convidado' : (p.regional || '-'),
      'Divisão': isConv ? 'Convidado' : (p.divisao || '-'),
      'Grau': grauFormatado,
      'Data/Hora da confirmação': p.dataHoraConfirmacao || ''
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(dados);
  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 18 },
    { wch: 30 },
    { wch: 20 },
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
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  pdfDoc.setFont('helvetica', 'bold');
  pdfDoc.setFontSize(18);
  pdfDoc.setTextColor(32, 30, 29);
  pdfDoc.text('1º BONDE DAS 1000 MOTOS', 14, 16);

  pdfDoc.setFont('helvetica', 'normal');
  pdfDoc.setFontSize(11);
  pdfDoc.setTextColor(96, 93, 93);
  pdfDoc.text('Lista de participantes confirmados (Membros Insanos MC e Convidados)', 14, 22);

  docDate(pdfDoc);

  const tableData = participantes.map((p, idx) => {
    const isConv = isParticipantConvidado(p, p.id);
    const coleteOuMc = isConv ? (p.motoclube ? `MC: ${p.motoclube}` : 'Sem Clube') : (p.nomeColete || '-');
    const cargoExtra = p.cargoFuncao || p.comandoInternacional || p.comandoPasta || '';
    const grauFormatado = isConv ? 'Convidado' : (p.grau ? (cargoExtra ? `${p.grau}\n(${cargoExtra})` : p.grau) : '-');
    return [
      idx + 1,
      isConv ? 'Convidado' : 'Membro Insanos',
      p.nome || '',
      coleteOuMc,
      isConv ? 'Convidado' : (p.regional || '-'),
      isConv ? 'Convidado' : (p.divisao || '-'),
      grauFormatado,
      p.dataHoraConfirmacao || ''
    ];
  });

  pdfDoc.autoTable({
    startY: 32,
    head: [['Nº', 'Tipo', 'Nome', 'Colete / Motoclube', 'Regional', 'Divisão', 'Grau', 'Data/Hora']],
    body: tableData,
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 2,
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
      1: { cellWidth: 30 },
      2: { cellWidth: 45 },
      3: { cellWidth: 40 },
      4: { cellWidth: 45 },
      5: { cellWidth: 45 },
      6: { cellWidth: 25 },
      7: { cellWidth: 30 }
    },
    margin: { left: 10, right: 10 }
  });

  const finalY = pdfDoc.lastAutoTable.finalY || 35;
  pdfDoc.setFont('helvetica', 'bold');
  pdfDoc.setFontSize(11);
  pdfDoc.setTextColor(0, 103, 134);
  pdfDoc.text(`TOTAL DE PARTICIPANTES: ${participantes.length}`, 14, finalY + 10);

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

testConnection();
