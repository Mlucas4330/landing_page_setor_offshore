import toast from 'react-hot-toast';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  motivosite: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
};

export const formatCNPJ = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
};

export const emptyForm = { nome: '', email: '', telefone: '', cnpj: '', motivosite: '' };

const validateFormData = (data: FormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.nome || data.nome.trim().length < 3) {
    errors.push({ field: 'nome', message: 'Nome deve ter pelo menos 3 caracteres' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'Email inválido' });
  }

  const cleanPhone = data.telefone.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10 || cleanPhone.length > 11) {
    errors.push({ field: 'telefone', message: 'Telefone inválido. Use formato: (XX) XXXXX-XXXX' });
  }

  const cleanCNPJ = data.cnpj.replace(/\D/g, '');
  if (!cleanCNPJ || cleanCNPJ.length !== 14) {
    errors.push({ field: 'cnpj', message: 'CNPJ inválido. Deve conter 14 dígitos' });
  }

  return errors;
};

const formatDataForHubSpot = (data: FormData) => {
  const cleanPhone = data.telefone.replace(/\D/g, '');
  const formattedPhone = `+55${cleanPhone.slice(-11)}`;
  const cleanCNPJ = data.cnpj.replace(/\D/g, '');

  return {
    fields: [
      { objectTypeId: '0-1', name: 'firstname', value: data.nome.trim() },
      { objectTypeId: '0-1', name: 'email', value: data.email.trim() },
      { objectTypeId: '0-1', name: 'phone', value: formattedPhone },
      { objectTypeId: '0-1', name: 'CNPJ', value: cleanCNPJ },
      { objectTypeId: '0-1', name: 'motivosite', value: data.motivosite.trim() },
    ],
    submittedAt: new Date().getTime(),
    context: {
      pageUri: window.location.href,
      pageName: document.title
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "Concordo em receber comunicações conforme a política de privacidade.",
        communications: [
          { value: true, subscriptionTypeId: 999, text: "Aceito receber comunicações." }
        ]
      }
    },
    skipValidation: true
  };
};

export const submitToHubSpot = async (data: FormData): Promise<boolean> => {
  const errors = validateFormData(data);

  if (errors.length > 0) {
    toast.error(errors[0].message);
    console.error('Validation errors:', errors);
    return false;
  }

  const loadingToast = toast.loading('Enviando formulário...');

  try {
    const payload = formatDataForHubSpot(data);

    const response = await fetch(import.meta.env.VITE_HUBSPOT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    toast.dismiss(loadingToast);

    if (response.ok) {
      toast.success('Proposta enviada com sucesso! Entraremos em contato em breve.');
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('HubSpot API error:', errorData);
      toast.error('Erro ao enviar formulário. Tente novamente mais tarde.');
      return false;
    }
  } catch (error) {
    toast.dismiss(loadingToast);
    console.error('Error submitting to HubSpot:', error);
    toast.error('Erro na conexão. Verifique sua internet e tente novamente.');
    return false;
  }
};