CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "task" varchar(128),
    "status" varchar(12),
    "start" varchar(12),
    "due" varchar(12)
);

-- Starting data to get app working.
INSERT INTO tasks ("task", "status", "start", "due")
VALUES ('Learn to cook', 'Not Started', '2020-1-1', '2020-1-1'),
('Piano Lessons', 'Not Started', '2020-1-1', '2020-1-1');

UPDATE tasks SET "task"='Learn Chi', "status"='Completed' WHERE "id"=61;

SELECT * FROM tasks;

DELETE FROM tasks;

DROP TABLE tasks;