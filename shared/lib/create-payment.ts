import axios from "axios";
import CryptoJS from "crypto-js";

// Тестовые данные
const merchantAccount = "test_merchant";
const merchantDomainName = "www.market.ua";
const orderReference = "DH783023"; // Уникальный номер заказа
const orderDate = Math.floor(Date.now() / 1000); // Время заказа в UNIX формате
const amount = "1547.36";
const currency = "UAH";
const productName = [
    "Процессор Intel Core i5-4670 3.4GHz",
    "Память Kingston DDR3-1600 4096MB PC3-12800",
];
const productCount = ["1", "1"];
const productPrice = ["1000", "547.36"];

// Секретный ключ
const key = "dhkq3vUi94{Z!5frxs(02ML";

// Формирование строки для подписи
const stringToHash = `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};${currency};${productName.join(
    ";"
)};${productCount.join(";")};${productPrice.join(";")}`;

// Генерация HMAC MD5 подписи
const hash = CryptoJS.HmacMD5(stringToHash, key).toString();

// Данные для отправки
const requestData = {
    transactionType: "CREATE_INVOICE",
    merchantAccount: merchantAccount,
    merchantDomainName: merchantDomainName,
    orderReference: orderReference,
    orderDate: orderDate,
    amount: amount,
    currency: currency,
    productName: productName,
    productCount: productCount,
    productPrice: productPrice,
    merchantSignature: hash, // Подпись для безопасности
    clientFirstName: "John",
    clientLastName: "Doe",
    clientEmail: "john.doe@example.com",
    clientPhone: "380630000000", // Тестовый номер телефона
    language: "ru",
};

// Функция для отправки запроса и получения ссылки
export const createPayment = async () => {
    try {
        // Отправляем POST-запрос на WayForPay API
        const response = await axios.post("https://secure.wayforpay.com/api", requestData);

        // Проверяем ответ
        if (response.data && response.data.invoiceUrl) {
            console.log("Ссылка на оплату:", response.data.invoiceUrl);
            return response.data.invoiceUrl;
        } else {
            console.error("Ошибка: не удалось получить ссылку на оплату");
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
    }
};
