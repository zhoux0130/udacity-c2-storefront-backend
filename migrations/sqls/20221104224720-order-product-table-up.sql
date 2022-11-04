CREATE TABLE order_products(
   id INT GENERATED ALWAYS AS IDENTITY,
   quantity INTEGER NOT NULL,
   product_id INTEGER NOT NULL,
   order_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   CONSTRAINT fk_order
      FOREIGN KEY(order_id) 
	  REFERENCES orders(id),
   CONSTRAINT fk_product
      FOREIGN KEY(product_id) 
	  REFERENCES products(id)  
);