import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "joaomarceloaf@outlook.com";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

const SUBJECT_LABELS: Record<string, string> = {
  selo: "Selo & Gravadora",
  producao: "Produção Musical",
  branding: "Branding Artístico",
  espaco: "Locação de Espaço",
  outro: "Outro",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Serviço de email não configurado" },
      { status: 500 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido" },
      { status: 400 }
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Nome, email e mensagem são obrigatórios" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const subjectLabel = SUBJECT_LABELS[subject] ?? subject;

  try {
    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Contato Música aos Montes <${CONTACT_FROM_EMAIL}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: subjectLabel
        ? `[Contato] ${subjectLabel} - ${name}`
        : `[Contato] Nova mensagem de ${name}`,
      html: `
        <h2>Nova mensagem do site</h2>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${subjectLabel ? `<p><strong>Assunto:</strong> ${escapeHtml(subjectLabel)}</p>` : ""}
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Falha ao enviar email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Falha ao enviar email" },
      { status: 500 }
    );
  }
}
