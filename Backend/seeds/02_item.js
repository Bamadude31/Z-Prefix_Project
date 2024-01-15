/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {"user_id": 1, "item_name": "Car", "description": "A stylish and efficient car, perfect for daily commutes. Comes with great fuel efficiency and modern features.", "quantity": 1},
    {"user_id": 1, "item_name": "Motorcycle", "description": "A sleek and powerful motorcycle, ideal for zipping through city traffic. Offers a thrilling riding experience with its agile handling.", "quantity": 1},
    {"user_id": 1, "item_name": "Bicycle", "description": "A reliable and eco-friendly bicycle, suitable for short-distance travels. Promotes a healthy lifestyle and reduces carbon footprint.", "quantity": 2},
    {"user_id": 1, "item_name": "Scooter", "description": "A convenient and compact scooter, perfect for urban mobility. Provides a comfortable ride and easy maneuverability.", "quantity": 1},
    {"user_id": 2, "item_name": "Electric Skateboard", "description": "An innovative electric skateboard, combining fun and practicality. Enjoy effortless cruising with its electric-powered motor.", "quantity": 1},
    {"user_id": 2, "item_name": "Segway", "description": "A self-balancing personal transporter, ideal for exploring the city. Experience smooth and effortless gliding with its advanced technology.", "quantity": 1},
    {"user_id": 2, "item_name": "Hoverboard", "description": "A futuristic hoverboard, offering a unique and exciting way to travel. Glide smoothly and effortlessly with its self-balancing technology.", "quantity": 2},
    {"user_id": 2, "item_name": "Electric Scooter", "description": "An eco-friendly electric scooter, perfect for short commutes. Enjoy a smooth and quiet ride with its electric-powered motor.", "quantity": 1},
    {"user_id": 2, "item_name": "Skateboard", "description": "A classic skateboard, suitable for tricks and stunts. Experience the joy of skateboarding with its durable construction.", "quantity": 2}
  ]);

};
