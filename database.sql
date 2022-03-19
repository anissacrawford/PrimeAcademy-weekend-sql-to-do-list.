CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (500),
	"description" VARCHAR (500), 
	"completed" BOOLEAN
);

INSERT INTO "tasks"(
	"task", "description", "completed"
) VALUES 
('laundry', 'clothes', true),
('laundry', 'bedding', false),
('workout', 'run', false),
('bathroom', 'clean shower', true);

SELECT * FROM "tasks" 
ORDER BY "id";

UPDATE "tasks"
SET "completed" = 'true' 
WHERE "id" = $1;

DELETE FROM "tasks"
WHERE "id" = $1;
