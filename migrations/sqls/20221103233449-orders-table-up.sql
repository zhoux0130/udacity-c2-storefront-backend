CREATE TABLE orders(
   id INT GENERATED ALWAYS AS IDENTITY,
   quantity INTEGER,
   status VARCHAR(10) NOT NULL,
   user_id INTEGER,
   product_id INTEGER,
   PRIMARY KEY(id),
   CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id),
   CONSTRAINT fk_product
      FOREIGN KEY(product_id) 
	  REFERENCES products(id)  
);