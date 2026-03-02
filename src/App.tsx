import { ChevronDown, LucideX, Shield, Globe, FileSearch, Cpu, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import TryLegnet from './components/TryLegnet';
import isos from './assets/isos.png';
import criativo_vertical from './assets/criativo_vertical.mp4';
import Marquee from "react-fast-marquee"
import abengoa from "./assets/abengoa.png"
import cocacola from "./assets/cocacola.png"
import raizen from "./assets/raizen.png"
import tigre from "./assets/tigre.png"
import volvo from "./assets/volvo.png"
import { emptyForm, formatPhone, formatCNPJ, submitToHubSpot } from "./utils/hubspotService"

function App() {
  const formRef = useRef<HTMLElement>(null);
  const [showFloatingVideo, setShowFloatingVideo] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'telefone') {
      setFormData(prev => ({ ...prev, [id]: formatPhone(value) }));
    } else if (id === 'cnpj') {
      setFormData(prev => ({ ...prev, [id]: formatCNPJ(value) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const success = await submitToHubSpot(formData);
    setLoading(false);
    if (success) setFormData(emptyForm);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingVideo(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <div className="bg-[#f5f5f5] text-black">

        {/* HEADER */}
        <header className="sticky top-0 z-50">
          <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
            <div className="flex items-center gap-2 md:gap-4">
              <button className="h-10 w-10 md:h-14 md:w-14 flex items-center justify-center hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 rounded-full backdrop-blur-xs shadow-lg">
                <img
                  src="icone_legnet.png"
                  alt="Legnet"
                  className="w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_10px_#c5ff00]"
                />
              </button>
              <button className="px-4 md:px-6 py-2 md:py-3 shadow-lg text-base md:text-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-xs rounded-full">
                Agile & LegNet
              </button>
            </div>
            <button
              onClick={scrollToForm}
              className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg transition-all duration-300 font-medium cursor-pointer bg-[#c5ff00] rounded-full hover:drop-shadow-[0_0_10px_#c5ff00] hover:scale-105"
            >
              Solicite uma Demonstração
            </button>
          </div>
        </header>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-8 py-12 md:py-16">
          <section className="space-y-8 md:space-y-12">
            <div className="text-6xl lg:text-7xl font-bold leading-tight">
              No offshore,<br />
              não conformidade<br />
              <span className="text-[#c5ff00]">
                não é um detalhe.<br />É uma catástrofe.
              </span>
            </div>

            <p className="text-base sm:text-lg md:text-xl font-light">
              Sua operação de alto risco está preparada para o nível de escrutínio que uma auditoria internacional exige? Com Agile e LegNet, a resposta é um SIM inabalável.
            </p>

            <div className="space-y-3 md:space-y-4">
              {[
                'Rastreabilidade absoluta de cada tarefa, documento e evidência',
                'Controle centralizado de obrigações legais, contratuais e corporativas',
                'Auditorias sob demanda com relatórios em um clique',
                'Blindagem reputacional com conformidade comprovada',
                'O sistema que trabalha para você, 24h por dia',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#c5ff00] font-normal text-sm md:text-base">{i + 1}.</span>
                  <p className="font-light text-sm md:text-base">{text}</p>
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={scrollToForm}
                className="px-8 py-4 text-base md:text-lg transition-all duration-300 font-medium cursor-pointer bg-[#c5ff00] rounded-full hover:drop-shadow-[0_0_10px_#c5ff00] hover:scale-105"
              >
                Solicite uma Demonstração
              </button>
              <p className="text-sm font-light text-gray-500 mt-3">
                Proteja sua operação, sua reputação e o meio ambiente. Veja como em minutos.
              </p>
            </div>
          </section>

          <section ref={formRef} className="bg-white space-y-6 md:space-y-8 shadow-lg rounded-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-center">Solicite uma Proposta</h2>


            <a href="https://wa.me/5521997279076"
              target="_blank"
              rel="noopener noreferrer"
              className="block shadow-md bg-white rounded-full w-full py-3 text-center text-black text-sm md:text-base"
            >
              WhatsApp
            </a>

            <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
              {[
                { id: 'nome', label: 'Nome*', type: 'text', placeholder: 'Nome', required: true },
                { id: 'email', label: 'E-mail*', type: 'email', placeholder: 'email@exemplo.com', required: true },
                { id: 'telefone', label: 'Telefone*', type: 'text', placeholder: '(00) 00000-0000', required: true },
                { id: 'cnpj', label: 'CNPJ*', type: 'text', placeholder: 'CNPJ da Empresa', required: true },
                { id: 'motivosite', label: 'Motivo', type: 'text', placeholder: 'Como podemos ajudar?', required: false },
              ].map(({ id, label, type, placeholder, required }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs md:text-sm font-normal mb-1">{label}</label>
                  <input
                    type={type}
                    id={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-6 shadow-md bg-white transition-all duration-300 hover:scale-105 cursor-pointer rounded-full text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#c5ff00]"
                    placeholder={placeholder}
                    required={required}
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-base md:text-lg transition-all duration-300 font-medium cursor-pointer bg-[#c5ff00] rounded-full hover:drop-shadow-[0_0_10px_#c5ff00] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </section>
        </div>

        {/* SEÇÃO 2: O PROBLEMA */}
        <section className="px-4 md:px-8 gap-14 py-10 md:py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
            Em águas internacionais, o improviso custa caro.
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-center max-w-3xl mx-auto mb-8 md:mb-12">
            Operar offshore é operar com margem de erro zero. A fiscalização é severa, as normas são globais e a pressão por segurança e conformidade é implacável. Você convive com estes riscos?
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <AlertTriangle size={22} className="text-[#c5ff00] shrink-0" />,
                title: 'Risco de Desastre',
                text: 'Uma pequena falha em um processo, uma documentação incompleta ou uma norma não atendida pode ser o gatilho para um incidente de grandes proporções, com impacto ambiental e humano.',
              },
              {
                icon: <Globe size={22} className="text-[#c5ff00] shrink-0" />,
                title: 'Reputação Global em Jogo',
                text: 'No offshore, as notícias correm o mundo em minutos. Uma não conformidade pode destruir a reputação da sua empresa e fechar portas em mercados internacionais.',
              },
              {
                icon: <FileSearch size={22} className="text-[#c5ff00] shrink-0" />,
                title: 'Pressão Contratual e Regulatória',
                text: 'A complexidade de normas nacionais, internacionais e cláusulas contratuais cria um campo minado. Gerenciar tudo isso em planilhas é contar com a sorte.',
              },
              {
                icon: <Shield size={22} className="text-[#c5ff00] shrink-0" />,
                title: 'Auditorias que Tiram o Sono',
                text: 'A preparação para uma auditoria de cliente ou regulatória é um processo longo, caro e estressante, que desvia sua equipe do foco principal: a operação.',
              },
            ].map((item, i) => (
              <div key={i} className="shadow-md bg-white rounded-xl p-5 md:p-6">
                <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#333] text-[#c5ff00] mb-4">
                  <span className="text-sm md:text-base font-medium">{item.title}</span>
                  {item.icon}
                </div>
                <p className="font-light text-sm md:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO 3: A SOLUÇÃO */}
        <section className="mx-4 md:mx-8 px-4 md:px-8 my-10 md:my-16 py-10 md:py-16 bg-white rounded-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">
            O sistema de controle absoluto para operações de alto risco.
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-center max-w-3xl mx-auto mb-8 md:mb-12">
            Nossa plataforma <strong>Agile</strong>, munida da inteligência <strong>LegNet</strong>, foi forjada na severidade das operações offshore. Nós entregamos a única solução que garante rastreabilidade e controle do início ao fim.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8">
            {[
              {
                title: 'Rastreabilidade Absoluta',
                text: 'Conecte cada tarefa, documento e evidência a um requisito específico. Crie uma trilha de auditoria à prova de falhas, do parafuso à licença de operação.',
              },
              {
                title: 'Controle Centralizado',
                text: 'Gerencie todas as suas obrigações — legais, contratuais, corporativas — em um único local. Padronize processos e garanta a conformidade em todas as frentes.',
              },
              {
                title: 'Auditorias sob Demanda',
                text: 'Responda a auditorias de clientes e reguladores com um clique. Exporte relatórios detalhados que comprovam sua conformidade e profissionalismo.',
              },
              {
                title: 'Blindagem Reputacional',
                text: 'Proteja sua marca com a conformidade comprovada. Garanta a confiança de clientes, investidores e reguladores com uma gestão de riscos impecável.',
              },
            ].map((item, i) => (
              <div key={i} className="shadow-md p-5 md:p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                <p className="font-light text-sm md:text-base">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 text-base md:text-lg transition-all duration-300 font-medium cursor-pointer bg-[#c5ff00] rounded-full hover:drop-shadow-[0_0_10px_#c5ff00] hover:scale-105"
            >
              Descubra a plataforma para ambientes críticos
            </button>
          </div>
        </section>

        <TryLegnet scrollToForm={scrollToForm} />

        {/* SEÇÃO 4: DIFERENCIAIS */}
        <section className="py-10 md:py-16 px-4 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            Forjado para a complexidade do offshore.
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="shadow-lg bg-white p-5 md:p-6 rounded-xl">
              <div className="flex justify-center mb-4">
                <BookOpen size={32} className="text-[#c5ff00]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-center mb-1">Inteligência que navega em águas complexas.</h3>
              <p className="text-center text-sm font-semibold text-[#c5ff00] mb-4">LegNet</p>
              <p className="font-light text-sm md:text-base">
                A <strong>LegNet</strong> decodifica a complexa teia de requisitos do setor offshore. Nossos especialistas traduzem normas da ANP, NORMAM, tratados internacionais e requisitos contratuais em obrigações claras e acionáveis dentro da plataforma.
              </p>
            </div>

            <div className="shadow-lg bg-white p-5 md:p-6 rounded-xl">
              <div className="flex justify-center mb-4">
                <Cpu size={32} className="text-[#c5ff00]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-center mb-1">O motor da sua operação segura.</h3>
              <p className="text-center text-sm font-semibold text-[#c5ff00] mb-4">Agile</p>
              <p className="font-light text-sm md:text-base">
                O <strong>Agile</strong> não é um software de prateleira. É um sistema de gestão robusto que permite criar fluxos de trabalho, gerenciar documentos controlados, registrar treinamentos e consolidar todas as evidências que uma operação offshore exige. É a garantia de que nada se perca.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO 5: PROVA SOCIAL */}
        <section className="px-4 md:px-8 py-8 md:py-12 my-10 md:my-16 bg-[#c2c0c0]">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12">
            A escolha dos gigantes do mar.
          </h2>

          <Marquee speed={50}>
            {[abengoa, cocacola, raizen, tigre, volvo].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="Logo Cliente"
                className="mx-8 md:mx-12 h-16 sm:h-20 md:h-28 w-auto"
              />
            ))}
          </Marquee>

          <div className="mt-10 max-w-2xl mx-auto bg-white/20 rounded-2xl p-6 md:p-8">
            <p className="text-white text-base sm:text-lg md:text-xl font-light italic text-center">
              "A rastreabilidade que o Agile nos proporcionou é incomparável. Hoje, temos a certeza de que estamos 100% em conformidade com todos os requisitos dos nossos contratos e das agências reguladoras."
            </p>
            <p className="text-white/70 text-sm text-center mt-4">— Gerente de QSMS</p>
          </div>
        </section>

        <TryLegnet scrollToForm={scrollToForm} />

        {/* COMPARATIVO */}
        <section className="mx-4 md:mx-8 px-4 md:px-8 my-10 md:my-16 py-10 md:py-16 bg-white rounded-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">
            Comparativo
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-center max-w-3xl mx-auto mb-8 md:mb-12">
            Não oferecemos um serviço de validação porque conformidade não pode depender de agenda humana. O Agile + LegNet é um avaliador digital que trabalha todos os dias, em todos os requisitos, sem custo variável.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="shadow-md p-5 md:p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-500">Concorrente</h3>
              <ul className="space-y-3">
                {[
                  'Validação manual',
                  'Serviço pontual',
                  'Dependente de pessoas',
                  'Olha o passado',
                  'Risco de subjetividade',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-light text-sm md:text-base text-gray-500">
                    <span className="shrink-0">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="shadow-md p-5 md:p-6 rounded-xl border-2 border-[#c5ff00]">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Agile + LegNet</h3>
              <ul className="space-y-3">
                {[
                  'Rastreabilidade e controle automatizados',
                  'Conformidade contínua e preventiva',
                  'Independente de escala',
                  'Atua antes, durante e depois',
                  'Padrão técnico e replicável',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-light text-sm md:text-base">
                    <span className="text-[#c5ff00] font-bold shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* O QUE MUDA NA PRÁTICA */}
        <section className="py-10 md:py-16 px-4 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            O que muda na prática para a empresa
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="shadow-md bg-white p-5 md:p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-500">Concorrente</h3>
              <ul className="space-y-3">
                {[
                  'O usuário preenche evidências',
                  'Alguém valida depois',
                  'O risco aparece tarde',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-light text-sm md:text-base text-gray-500">
                    <span className="shrink-0">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="shadow-md bg-white p-5 md:p-6 rounded-xl border-2 border-[#c5ff00]">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">Agile + LegNet</h3>
              <ul className="space-y-3">
                {[
                  'O sistema orienta e conecta cada requisito',
                  'Evidências, documentos e trilhas de auditoria automáticas',
                  'A não conformidade é evitada, não apenas identificada',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-light text-sm md:text-base">
                    <span className="text-[#c5ff00] font-bold shrink-0">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS EXCLUSIVOS */}
        <section className="mx-4 md:mx-8 px-4 md:px-8 my-10 md:my-16 py-10 md:py-16 bg-[#333] rounded-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12">
            Diferencial exclusivo do Agile + LegNet
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              'ANP, NORMAM, tratados internacionais — tudo traduzido em obrigações claras e acionáveis',
              'Trilha de auditoria completa, do parafuso à licença de operação',
              'Gestão centralizada de obrigações legais, contratuais e corporativas',
              'O sistema trabalha para você, não o contrário — nada se perde',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                <CheckCircle2 size={20} className="text-[#c5ff00] shrink-0 mt-0.5" />
                <p className="text-white font-light text-sm md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <TryLegnet scrollToForm={scrollToForm} />

        {/* ISO */}
        <section className="mx-4 md:mx-8 my-10 md:my-16 p-6 md:p-8 bg-[#c2c0c0] rounded-3xl">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white mx-auto max-w-3xl leading-relaxed">
            Atuamos com padrões reconhecidos mundialmente, garantindo qualidade, segurança e eficácia em todos os processos.
          </p>
          <img
            src={isos}
            alt="Certificações ISO e ONU"
            className="w-full max-w-2xl h-auto object-contain mx-auto"
          />
        </section>

        <TryLegnet scrollToForm={scrollToForm} />

        {/* FAQ */}
        <section className="py-10 md:py-16 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">

            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-3 md:p-4">
                  <span className="text-base md:text-lg font-bold">Qual a diferença entre o Agile + LegNet e um serviço tradicional de conformidade?</span>
                  <span className="transition group-open:rotate-180 text-[#c5ff00] shrink-0 ml-4"><ChevronDown /></span>
                </summary>
                <div className="p-3 md:p-4 font-light text-sm md:text-base">
                  Serviços tradicionais validam o que já aconteceu — olham o passado. O Agile + LegNet atua preventivamente, rastreando cada tarefa, documento e evidência em tempo real. Ele alerta, organiza e garante que a não conformidade seja evitada, não apenas identificada, sem depender de agenda humana ou custo variável.
                </div>
              </details>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-3 md:p-4">
                  <span className="text-base md:text-lg font-bold">Como o sistema lida com normas ANP, NORMAM e tratados internacionais?</span>
                  <span className="transition group-open:rotate-180 text-[#c5ff00] shrink-0 ml-4"><ChevronDown /></span>
                </summary>
                <div className="p-3 md:p-4 font-light text-sm md:text-base">
                  A LegNet decodifica toda essa complexidade. Nossos especialistas traduzem normas nacionais, internacionais e cláusulas contratuais em obrigações claras e acionáveis dentro da plataforma Agile. O usuário não precisa conhecer cada norma — o sistema já sabe o que exigir e como evidenciar.
                </div>
              </details>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-3 md:p-4">
                  <span className="text-base md:text-lg font-bold">Como funciona a geração de relatórios para auditorias?</span>
                  <span className="transition group-open:rotate-180 text-[#c5ff00] shrink-0 ml-4"><ChevronDown /></span>
                </summary>
                <div className="p-3 md:p-4 font-light text-sm md:text-base">
                  Com o Agile, você responde a auditorias de clientes e reguladores com um clique. O sistema consolida automaticamente todas as evidências, documentos controlados e trilhas de auditoria em relatórios detalhados que comprovam sua conformidade — sem estresse e sem desviar sua equipe da operação.
                </div>
              </details>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-3 md:p-4">
                  <span className="text-base md:text-lg font-bold">Por que conformidade offshore não pode depender de pessoas?</span>
                  <span className="transition group-open:rotate-180 text-[#c5ff00] shrink-0 ml-4"><ChevronDown /></span>
                </summary>
                <div className="p-3 md:p-4 font-light text-sm md:text-base">
                  Porque no offshore a margem de erro é zero. A fiscalização é severa, as normas são globais e qualquer falha pode ter impacto ambiental e humano de grandes proporções. O Agile + LegNet trabalha todos os dias, em todos os requisitos, garantindo que nada se perca e que sua operação esteja sempre protegida.
                </div>
              </details>
            </div>

          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-4 md:mx-8 px-4 md:px-8 my-10 md:my-16 py-14 md:py-20 bg-[#111] rounded-3xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6">
            Sua operação está segura<br />ou apenas operando?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto mb-10">
            No offshore, a segurança não é uma prioridade, é a única opção. Não deixe que uma falha invisível coloque sua operação, sua reputação e o meio ambiente em risco. Assuma o controle absoluto com a solução que entende a criticidade do seu negócio.
          </p>
          <button
            onClick={scrollToForm}
            className="px-10 py-5 text-lg md:text-xl transition-all duration-300 font-bold cursor-pointer bg-[#c5ff00] rounded-full hover:drop-shadow-[0_0_20px_#c5ff00] hover:scale-105"
          >
            AGENDAR DEMONSTRAÇÃO URGENTE
          </button>
          <p className="text-white/50 text-sm mt-6">Veja como podemos implementar o controle total na sua operação.</p>
        </section>

        {/* Vídeo flutuante */}
        {showFloatingVideo && (
          <div className="fixed bottom-24 right-4 z-50">
            <div className="relative">
              <video
                className="object-cover rounded-lg shadow-lg w-36 h-56 sm:w-44 sm:h-64 md:w-[180px] md:h-[280px]"
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={criativo_vertical} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
              <button
                className="absolute -top-2 -right-2 bg-gray-800 cursor-pointer duration-300 transition-all hover:scale-105 text-white rounded-full w-6 h-6 p-1 flex items-center justify-center"
                onClick={() => setShowFloatingVideo(false)}
              >
                <LucideX size={14} />
              </button>
            </div>
          </div>
        )}

        <footer className="px-4 pb-8">
          <p className="text-gray-600 text-center font-light mb-4 text-sm md:text-base">
            © 2025 Agile & LegNet. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;