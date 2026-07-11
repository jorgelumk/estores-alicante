// src/config/siteConfig.ts

export interface SiteConfig {
  city: string;
  province: string;
  domain: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  schedule: string;
  
  // Lista de municipios para el formulario de presupuestos
  municipios: string[];

  // Bloques de texto único redactados a mano para evitar contenido duplicado
  customTexts: {
    // Breve descripción de presentación (quiénes somos local)
    localIntro: string;
    // Texto enfocado en el clima local para destacar los estores térmicos
    climateDefense: string;
    // Detalle de las zonas donde se presta servicio
    serviceAreas: string;
  };
}

export const siteConfig: SiteConfig = {
  city: "Alicante",
  province: "Alicante",
  domain: "estores-alicante.com",
  phone: "600000000",
  phoneFormatted: "+34 600 000 000",
  email: "info@estores-alicante.com",
  schedule: "Lunes a Viernes de 9:00 a 19:00",
  
  municipios: [
    "Alicante (capital)", "Elche", "Torrevieja", "Benidorm", "Alcoy / Alcoi",
    "Villajoyosa", "Orihuela", "Santa Pola", "Guardamar del Segura", "Dénia",
    "Xàbia / Jávea", "Calp / Calpe", "Altea", "Alfàs del Pi / Alfaz del Pi",
    "Finestrat", "La Nucía", "Benissa", "Teulada-Moraira", "Pego", "Ondara",
    "El Campello", "Mutxamel / Mutxamel", "San Vicente del Raspeig",
    "Alicante - Playa de San Juan", "Alicante - Vistahermosa", "Novelda",
    "Petrer", "Elda", "Sax", "Villena", "Ibi", "Cocentaina",
    "Crevillent", "Rojales", "Los Montesinos", "Pilar de la Horadada",
    "Bigastro", "Callosa de Segura", "Almoradí", "Dolores", "Catral"
  ],

  customTexts: {
    localIntro: "Somos artesanos locales expertos en la confección de estores a medida en la Costa Blanca. Nos desplazamos directamente a tu domicilio para tomar medidas exactas y garantizar que cada estor encaje de forma milimétrica en tus ventanas, aportando elegancia y funcionalidad a cada habitación.",
    climateDefense: "El clima mediterráneo y las altas horas de insolación en nuestra provincia exigen soluciones inteligentes. Nuestros estores Screen con filtro solar reducen hasta un 85% la radiación térmica entrante, protegiendo tus muebles del desgaste solar y rebajando el consumo de aire acondicionado en los meses más calurosos.",
    serviceAreas: "Ofrecemos cobertura completa y desplazamiento sin compromiso para la medición e instalación en toda la comarca del Alacantí, el Bajo Vinalopó, la Marina Baja y zonas limítrofes."
  }
};
