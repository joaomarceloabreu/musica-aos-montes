"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!formData.name.trim()) errs.name = "Nome é obrigatório";
    if (!formData.email.trim()) {
      errs.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Email inválido";
    }
    if (!formData.message.trim()) errs.message = "Mensagem é obrigatória";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate();
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name as keyof FieldErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate();
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name as keyof FieldErrors],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const fieldClass = (name: string) =>
    `w-full rounded-lg border px-4 py-3 text-cream placeholder-cream/30 transition-all duration-300 focus:outline-none focus:ring-2 ${
      errors[name as keyof FieldErrors] && touched[name]
        ? "border-terra bg-terra/10 focus:border-terra focus:ring-terra/30"
        : "border-cream/10 bg-cream/5 focus:border-turquoise focus:ring-turquoise/20"
    }`;

  if (submitted) {
    return (
      <section id="contato" className="bg-navy py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-turquoise/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-10 w-10 text-turquoise"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-cream">
                Mensagem enviada!
              </h3>
              <p className="max-w-md text-lg text-cream/70">
                Obrigado pelo contato. Retornaremos em breve.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                  });
                  setTouched({});
                  setErrors({});
                }}
                className="mt-4 rounded-lg border border-cream/20 px-6 py-3 text-sm font-bold uppercase tracking-widest text-cream transition-colors hover:bg-cream/10"
              >
                Nova mensagem
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-turquoise">
              {">"} Contato
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-cream md:text-5xl">
              Vamos conversar
            </h3>
            <p className="mb-12 text-lg text-cream/70">
              Tem um projeto em mente? Entre em contato e descubra como podemos
              ajudar a dar vida à sua música.
            </p>

            <div className="space-y-6 text-cream/70">
              <div className="flex items-start gap-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mt-1 h-5 w-5 flex-shrink-0 text-turquoise"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p>
                  Bairro Mangabeiras, Belo Horizonte - MG
                  <br />
                  <span className="text-cream/50">
                    Aos pés da Serra do Curral
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5 flex-shrink-0 text-turquoise"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <p>contato@musicaaosmontes.com</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold uppercase tracking-wider text-cream/60"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass("name")}
                    placeholder="Seu nome"
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-xs text-terra-light">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold uppercase tracking-wider text-cream/60"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass("email")}
                    placeholder="seu@email.com"
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-terra-light">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-bold uppercase tracking-wider text-cream/60"
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-cream/10 bg-cream/5 px-4 py-3 text-cream placeholder-cream/30 transition-all duration-300 focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/20"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-bold uppercase tracking-wider text-cream/60"
                  >
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-cream/10 bg-cream/5 px-4 py-3 text-cream transition-all duration-300 focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/20"
                  >
                    <option value="" className="bg-navy">
                      Selecione
                    </option>
                    <option value="selo" className="bg-navy">
                      Selo & Gravadora
                    </option>
                    <option value="producao" className="bg-navy">
                      Produção Musical
                    </option>
                    <option value="branding" className="bg-navy">
                      Branding Artístico
                    </option>
                    <option value="espaco" className="bg-navy">
                      Locação de Espaço
                    </option>
                    <option value="outro" className="bg-navy">
                      Outro
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-bold uppercase tracking-wider text-cream/60"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  className={`resize-none ${fieldClass("message")}`}
                  placeholder="Conte-nos sobre seu projeto..."
                />
                {errors.message && touched.message && (
                  <p className="mt-1 text-xs text-terra-light">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group w-full rounded-lg bg-turquoise px-8 py-4 text-sm font-bold uppercase tracking-widest text-navy transition-all duration-300 hover:bg-turquoise-light hover:shadow-lg hover:shadow-turquoise/20 active:scale-[0.98] sm:w-auto"
              >
                Enviar Mensagem
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
