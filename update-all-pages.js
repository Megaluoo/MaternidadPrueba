// Script para actualizar todos los headers y footers de las páginas HTML
// Este archivo es solo de referencia - las actualizaciones se hacen manualmente

const COMMON_NAV_HTML = `
                    <li><a href="index.html" class="nav-link"><span>Inicio</span></a></li>
                    <li><a href="sobre-nosotros.html" class="nav-link"><span>La Clínica</span></a></li>
                    <li class="nav-dropdown">
                        <a href="servicios.html" class="nav-link dropdown-toggle">
                            <span>Servicios</span>
                            <i class="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="servicios.html"><i class="fa-solid fa-baby"></i> Maternidad</a></li>
                            <li><a href="sala-parto-humanizado.html"><i class="fa-solid fa-heart"></i> Sala de Parto Humanizado</a></li>
                            <li><a href="neonatologia.html"><i class="fa-solid fa-baby"></i> Neonatología</a></li>
                            <li><a href="servicios.html#pediatria"><i class="fa-solid fa-child"></i> Pediatría</a></li>
                            <li><a href="emergencia.html"><i class="fa-solid fa-truck-medical"></i> Emergencia 24/7</a></li>
                            <li><a href="imeca.html"><i class="fa-solid fa-x-ray"></i> IMECA - Imagenología</a></li>
                            <li><a href="ecografia-la-floresta.html"><i class="fa-solid fa-baby"></i> Ecografía La Floresta</a></li>
                            <li><a href="florlab.html"><i class="fa-solid fa-flask"></i> Florlab - Laboratorio Clínico</a></li>
                            <li><a href="laboratorio.html"><i class="fa-solid fa-vial"></i> Laboratorio</a></li>
                            <li><a href="banco-sangre.html"><i class="fa-solid fa-heart-pulse"></i> Banco de Sangre</a></li>
                            <li><a href="servicios.html#quirurgico"><i class="fa-solid fa-user-doctor"></i> Área Quirúrgica</a></li>
                            <li><a href="unidad-cardiopulmonar.html"><i class="fa-solid fa-heart-pulse"></i> Unidad Cardiopulmonar</a></li>
                            <li><a href="cefesmar.html"><i class="fa-solid fa-dna"></i> CEFESMAR</a></li>
                            <li><a href="planes-maternidad.html"><i class="fa-solid fa-heart"></i> Planes de Maternidad</a></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <a href="#" class="nav-link dropdown-toggle">
                            <span>Accesos Rápidos</span>
                            <i class="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="directorio.html"><i class="fa-solid fa-user-doctor"></i> Directorio Médico</a></li>
                            <li><a href="presupuesto.html"><i class="fa-solid fa-calculator"></i> Presupuesto Online</a></li>
                            <li><a href="contacto.html#laboratorio"><i class="fa-solid fa-flask"></i> Resultados de Laboratorio</a></li>
                            <li><a href="galeria.html"><i class="fa-solid fa-images"></i> Galería de Bebés</a></li>
                        </ul>
                    </li>
                    <li><a href="directorio.html" class="nav-link"><span>Directorio Médico</span></a></li>
                    <li><a href="galeria.html" class="nav-link"><span>Bebés</span></a></li>
`;

// Nota: Este archivo es solo de referencia. Las actualizaciones se hacen directamente en cada HTML.
