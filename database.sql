
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "activity_type" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (1000),
	"created_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_date" TIMESTAMPTZ
);

CREATE TABLE "activities" (
    "id" SERIAL PRIMARY KEY,
    "date" DATE,
    "temperature" INT,
    "weather_conditions" TEXT,
    "notes" TEXT,
    "user_id" INT REFERENCES "user",
    "activity_type_id" INT REFERENCES "activity_type",
	"created_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_date" TIMESTAMPTZ
);

CREATE TABLE "clothing_type" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (1000),
	"created_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_date" TIMESTAMPTZ
);

CREATE TABLE "clothes" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "user_id" INT REFERENCES "user",
    "clothing_type_id" INT REFERENCES "clothing_type",
	"created_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_date" TIMESTAMPTZ
);

CREATE TABLE "activities_clothes" (
    "id" SERIAL PRIMARY KEY,
    "activities_id" INT REFERENCES "activities",
    "clothes_id" INT REFERENCES "clothes",
	"created_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_date" TIMESTAMPTZ
);

INSERT INTO "activity_type" 
	("type")
	VALUES 
	('Biking'),
	('Running'),
	('CC Skiing (classic)'),
	('CC Skiing (Skate)'),
	('Other');
	
INSERT INTO "clothing_type" 
	("type")
	VALUES 
	('Hat'),
	('Gloves'),
	('Socks'),
	('Base layer - torso'),
	('Base layer - legs'),
	('Jacket'),
	('Pants'),
	('Accessories'),
	('Other');


INSERT INTO "clothes" 
	("name", "description", "user_id", "clothing_type_id")
	VALUES 
	('Swix Hat', 'The thin cross country skiing hat I got from Gear West in high school', 1, 1),
	('Swix Lobster Gloves', 'The bright yellow lobster gloves', 1, 2),
	('Thick Smartwool', 'The thickest smartwool socks', 1, 3),
	('Smartwool', 'The grey smartwool baselayer', 1, 4),
	('Under Armor', 'The thin old under armor tights', 1, 5),
	('Gortex Bike Jacket', 'The bright yellow gortex jacket', 1, 6),
	('Swix Ski Pants', 'The old cc ski pants from high school', 1, 7),
	('Clear Bolle Goggles', 'The clear goggles', 1, 8),
	('Green Buff', 'The green stripey buff', 1, 9);
	

INSERT INTO "activities" 
	("date", "temperature", "weather_conditions", "notes", "user_id", "activity_type_id")
	VALUES 
	('01/01/2024', 20, 'Cloudy, windy', 'Biked to school', 1, 1);
	
INSERT INTO "activities_clothes" 
	("activities_id", "clothes_id")
	VALUES 
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(1, 6),
	(1, 7),
	(1, 8),
	(1, 9);