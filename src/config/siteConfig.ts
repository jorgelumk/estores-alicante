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
  city: "Zaragoza",
  province: "Zaragoza",
  domain: "estores-zaragoza.com",
  phone: "686382891", // Podemos mantener el mismo de momento o cambiarlo si el usuario lo indica
  phoneFormatted: "+34 686 382 891",
  email: "info@estoreszaragoza.com",
  schedule: "Lunes a Viernes de 9:00 a 19:00",
  
  municipios: [
    "Zaragoza (capital)", "Calatayud", "Utebo", "Ejea de los Caballeros", "Tarazona",
    "Caspe", "Cuarte de Huerva", "La Almunia de Doña Godina", "Tauste", "Zuera",
    "Alagón", "La Puebla de Alfindén", "La Muela", "Fuentes de Ebro", "María de Huerva",
    "Épila", "Cadrete", "Pinseque", "San Mateo de Gállego", "Villamayor de Gállego",
    "Cariñena", "Sádaba", "Borja", "Illueca", "Fuendejalón", "Pedrola", "Gelsa",
    "La Joyosa", "Figueruelas", "Ateca", "Daroca", "Mallén", "Brea de Aragón",
    "Mequinenza", "Maella", "Sos del Rey Católico", "Pastriz", "Burgo de Ebro"
  ],

  customTexts: {
    localIntro: "Somos artesanos expertos en la confección e instalación de estores a medida en Zaragoza. Nos desplazamos directamente a tu domicilio para tomar medidas de forma milimétrica y ayudarte a elegir la solución que mejor se adapte a tu decoración y necesidades de privacidad.",
    climateDefense: "El clima de Zaragoza es exigente, con el característico azote del cierzo y contrastes térmicos extremos entre inviernos helados y veranos muy calurosos. Nuestros estores con aislamiento térmico y tejidos técnicos avanzados actúan como una barrera eficiente, manteniendo una temperatura confortable en el interior y optimizando el consumo energético en climatización todo el año.",
    serviceAreas: "Ofrecemos cobertura completa y desplazamiento para mediciones sin coste alguno en Zaragoza capital y en las principales localidades de la provincia, incluyendo municipios del cinturón metropolitano como Utebo, Cuarte de Huerva, Cadrete, La Puebla de Alfindén y Zuera."
  }
};
