"use strict"; // Строгий режим (по методичке)

// ==========================================
// 1. Массив исходных данных (15 объектов)
// ==========================================
const roomsData = [
    { id: 1, hotelName: "Горный воздух", roomType: "Стандарт", price: 3500, rating: 8.7, hasBreakfast: true },
    { id: 2, hotelName: "Горный воздух", roomType: "Комфорт", price: 5200, rating: 9.0, hasBreakfast: true },
    { id: 3, hotelName: "Горный воздух", roomType: "Люкс", price: 9800, rating: 9.5, hasBreakfast: true },
    { id: 4, hotelName: "Альпийская сказка", roomType: "Стандарт", price: 4000, rating: 8.5, hasBreakfast: false },
    { id: 5, hotelName: "Альпийская сказка", roomType: "Полулюкс", price: 7000, rating: 9.2, hasBreakfast: true },
    { id: 6, hotelName: "Снежная вершина", roomType: "Эконом", price: 2500, rating: 7.8, hasBreakfast: false },
    { id: 7, hotelName: "Снежная вершина", roomType: "Стандарт", price: 3800, rating: 8.2, hasBreakfast: true },
    { id: 8, hotelName: "Пик Отель", roomType: "Бизнес", price: 8500, rating: 9.1, hasBreakfast: true },
    { id: 9, hotelName: "Пик Отель", roomType: "Люкс", price: 12000, rating: 9.8, hasBreakfast: true },
    { id: 10, hotelName: "Лесная гавань", roomType: "Стандарт", price: 3000, rating: 8.0, hasBreakfast: false },
    { id: 11, hotelName: "Лесная гавань", roomType: "Семейный", price: 6000, rating: 8.9, hasBreakfast: true },
    { id: 12, hotelName: "Озерный край", roomType: "Стандарт", price: 3200, rating: 8.4, hasBreakfast: true },
    { id: 13, hotelName: "Озерный край", roomType: "Люкс", price: 10500, rating: 9.4, hasBreakfast: true },
    { id: 14, hotelName: "Тихий уголок", roomType: "Эконом", price: 2000, rating: 7.5, hasBreakfast: false },
    { id: 15, hotelName: "Тихий уголок", roomType: "Комфорт", price: 4500, rating: 9.3, hasBreakfast: true }
];

// ==========================================
// 2. Базовый класс HotelRoom
// ==========================================
class HotelRoom {
    constructor(id, hotelName, roomType, price, rating, hasBreakfast) {
        this.id = id;
        this.hotelName = hotelName;
        this.roomType = roomType;
        this.price = price;
        this.rating = rating;
        this.hasBreakfast = hasBreakfast;
    }

    // Метод генерации DOM-элемента
    render() {
        // Создаем корневую карточку
        const card = document.createElement("article");
        card.classList.add("card");
        
        // Добавляем data-id (обязательно по методичке п.7)
        card.dataset.id = this.id;

        // --- 1. Обертка картинки ---
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("card__image-wrapper");
        
        const img = document.createElement("img");
        img.classList.add("card__image");
        // Используем заглушку, так как у нас нет 15 разных картинок
        img.src = "images/lux.jpg"; 
        img.alt = this.roomType;
        
        const ratingBadge = document.createElement("span");
        ratingBadge.classList.add("card__rating");
        ratingBadge.textContent = `${this.rating} Отлично`;

        imgWrapper.append(img, ratingBadge);

        // --- 2. Тело карточки ---
        const body = document.createElement("div");
        body.classList.add("card__body");

        const title = document.createElement("h3");
        title.classList.add("card__title");
        title.textContent = `${this.hotelName} — ${this.roomType}`;

        // Блок завтрака (используем textContent для безопасности)
        const breakfast = document.createElement("p");
        breakfast.classList.add("card__text");
        breakfast.textContent = this.hasBreakfast ? "Завтрак включён" : "Без завтрака";

        const price = document.createElement("p");
        price.classList.add("card__price");
        price.textContent = `${this.price} ₽ / ночь`;

        const link = document.createElement("a");
        link.classList.add("card__link");
        link.href = "detail.html";
        link.textContent = "Подробнее";

        // Собираем карточку (append)
        body.append(title, breakfast, price, link);
        card.append(imgWrapper, body);

        // Возвращаем готовый узел
        return card;
    }
}

// ==========================================
// 3. Отрисовка карточек на странице
// ==========================================
function renderCatalog() {
    // Проверка существования контейнера (по методичке п.6)
    const container = document.querySelector("#catalog-container");
    
    // Если мы не на странице каталога — прерываем выполнение
    if (!container) return; 

    // Очищаем контейнер (на всякий случай)
    container.textContent = "";

    // Перебираем массив данных
    roomsData.forEach(roomData => {
        // Создаем экземпляр класса
        const roomInstance = new HotelRoom(
            roomData.id, 
            roomData.hotelName, 
            roomData.roomType, 
            roomData.price, 
            roomData.rating, 
            roomData.hasBreakfast
        );
        
        // Получаем DOM-узел через метод render()
        const cardElement = roomInstance.render();
        
        // Вставляем в контейнер
        container.append(cardElement);
    });
}

// Запускаем отрисовку
renderCatalog();

// ==========================================
// 4. Аналитика (Вариант 13)
// ==========================================
function analyzeData() {
    console.log("=== АНАЛИТИКА ПО ВАРИАНТУ 13 ===");

    // Задача: вывести массив названий отелей, предлагающих завтрак 
    // и имеющих рейтинг выше 9.0, отсортированный по цене (от меньшей к большей).

    const result = roomsData
        // 1. Фильтруем (завтрак + рейтинг > 9.0)
        .filter(room => room.hasBreakfast === true && room.rating > 9.0)
        // 2. Сортируем по цене (a - b = по возрастанию)
        .sort((a, b) => a.price - b.price)
        // 3. Преобразуем в массив названий отелей (map)
        .map(room => room.hotelName);

    // Выводим результат в консоль
    console.log("Отели с завтраком и рейтингом > 9.0 (от дешевых к дорогим):", result);
}

// Запускаем аналитику
analyzeData();