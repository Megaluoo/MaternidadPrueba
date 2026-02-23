// Script para actualizar números de WhatsApp en todas las páginas HTML
// Ejecutar con Node.js: node update-whatsapp.js

const fs = require('fs');
const path = require('path');

const OLD_NUMBERS = [
    '+58 412 123 4567',
    '+584121234567',
    '584121234567',
    'wa.me/584121234567'
];

const NEW_NUMBER = '+584121967195';
const NEW_NUMBER_URL = 'https://wa.me/584121967195';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'update-menu-template.html');

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Reemplazar números en texto
    OLD_NUMBERS.forEach(old => {
        if (content.includes(old)) {
            content = content.replace(new RegExp(old.replace(/[+()]/g, '\\$&'), 'g'), NEW_NUMBER);
            modified = true;
        }
    });
    
    // Reemplazar enlaces wa.me
    content = content.replace(/wa\.me\/584121234567/g, 'wa.me/584121967195');
    content = content.replace(/href="https:\/\/wa\.me\/584121234567"/g, `href="${NEW_NUMBER_URL}"`);
    
    // Actualizar botones de WhatsApp para que tengan el enlace correcto
    content = content.replace(/<a href="#" class="btn[^"]*btn-gradient"><i class="fa-brands fa-whatsapp"><\/i> Citas<\/a>/g, 
        `<a href="${NEW_NUMBER_URL}" class="btn btn-primary btn-gradient" target="_blank"><i class="fa-brands fa-whatsapp"></i> Citas</a>`);
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✓ Actualizado: ${file}`);
    }
});

console.log('✅ Actualización de WhatsApp completada');
