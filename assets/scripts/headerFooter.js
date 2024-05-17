var headerContent = `
<nav class="navbar">
            <div>
                <a href="#">
                    <img src="./assets/images/logo_header.webp" alt="Pinka logo" class="navbar__logo-img">
                </a>
            </div>
            <div>
                <ul class="navbar__list_container">
                    <li><a href="./index.html" class="navbar__list-items">Inicio</a></li>
                    <li><a href="./productos.html" class="navbar__list-items">Productos</a></li>
                    <li><a href="./servicios.html" class="navbar__list-items">Servicios</a></li>
                    <li><a href="./contacto.html" class="navbar__list-items">Contacto</a></li>
                </ul>
            </div>
            <div class="navbar__users_elements">
                <a href="#">
                    <img src="./assets/icons/cart.svg" alt="carrito">
                    <span id="cartAmount" class="cartAmount badge badge-danger">0</span> 
                </a>
                <button class="navbar__desktop_menu buttons">Inicia sesión</button>
                <label class="navbar__mobile_menu" for="menu_hamburguesa"><img src="./assets/icons/menu.svg"
                        alt="menu mobile"></label>
                <input class="navbar__hamburguesa_check" type="checkbox" id="menu_hamburguesa">
            </div>
        </nav>
`;

document.getElementById("mainHeader").innerHTML = headerContent;

var footerContent = `
<div>
            <div class="footer__contacto">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8474355080925!2d-58.37492876003967!3d-34.608019198132475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3352cbe276f75%3A0x2c5b4b3849944476!2sBalcarce%2078%2C%20C1064AAC%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1715225466474!5m2!1ses-419!2sar"
                    width="600" height="200" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div>
                <div class="footer__contacto_info"><img src="./assets/icons/pin.svg"><p>Balcarse 78</p></div>
                <div class="footer__contacto_info"><img src="./assets/icons/telefono.svg"><p>11 5522-8899</p></div>
                <div class="footer__contacto_info"><img src="./assets/icons/horario.svg"><p>Lunes a sábado de 8hs a 19hs</p></div>
                <div class="footer__contacto_info"><img src="./assets/icons/correo.svg"><p>info@pinka.com.ar</p></div>
                </div>
            </div>
            <div class="footer__social">
                <p>Encontranos en las redes:</p>
                <a href="#"><img src="./assets/icons/fb.svg" alt="Facebook pinka"></a>
                <a href="#"><img src="./assets/icons/ig.svg" alt="Instagram pinka"></a>
                <a href="#"><img src="./assets/icons/x.svg" alt="X social pinka"></a>
            </div>
        </div>
`;

document.getElementById("mainFooter").innerHTML = footerContent;