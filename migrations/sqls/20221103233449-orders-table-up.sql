CREATE TABLE orders(
   id INT GENERATED ALWAYS AS IDENTITY,
   status VARCHAR(10) NOT NULL,
   user_id INTEGER,
   PRIMARY KEY(id),
   CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)  
);