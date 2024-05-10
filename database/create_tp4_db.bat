@echo off

rem Set your PostgreSQL path
set PG_PATH=C:\Program Files\PostgreSQL\16\bin

rem Set your PostgreSQL username and password
set DB_USER=postgres
set DB_PASSWORD=root

rem Ensure the PostgreSQL bin directory is in the path for this session
set PATH=%PG_PATH%;%PATH%

rem Attempt to delete the database if it exists
echo Attempting to delete existing database...
"%PG_PATH%\dropdb" -U %DB_USER% --if-exists TP4
if %ERRORLEVEL% == 0 (
    echo Database TP4 deleted successfully.
) else (
    echo Database TP4 could not be deleted, possibly because it did not exist.
)

rem Create the database
echo Creating new database...
"%PG_PATH%\createdb" -U %DB_USER% TP4
if %ERRORLEVEL% == 0 (
    echo Database TP4 created successfully.
) else (
    echo Failed to create database TP4.
    exit /b
)

rem Run the schema SQL file
echo Populating the database with schema...
"%PG_PATH%\psql" -U %DB_USER% TP4 < bdschema.sql
if %ERRORLEVEL% == 0 (
    echo Database schema applied successfully.
) else (
    echo Failed to apply database schema.
    exit /b
)

rem Run the data SQL file
echo Populating the database with data...
"%PG_PATH%\psql" -U %DB_USER% TP4 < data.sql
if %ERRORLEVEL% == 0 (
    echo Database data populated successfully.
) else (
    echo Failed to populate database with data.
    exit /b
)

echo Database TP4 created and populated.

rem Pause the batch file to see the output when run
pause
