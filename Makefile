.PHONY: dev server client install

install:
	cd server && npm install
	cd client && npm install

server:
	cd server && npm run dev

client:
	cd client && npm start

dev:
	make -j 2 server client
