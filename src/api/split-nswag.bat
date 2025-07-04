@echo off
echo Starting NSwag generation and splitting...

REM Run NSwag to generate the TypeScript client
echo Running NSwag generation...
cd /d "C:\Users\Mert\source\repos\TeiasMongoAPI\TeiasMongoAPI.API"
nswag run nswag.json

REM Check if generation was successful
if %errorlevel% neq 0 (
    echo NSwag generation failed!
    pause
    exit /b 1
)

echo NSwag generation completed successfully!

REM Run the splitter script
echo Running code splitter...
cd /d "C:\Users\Mert\caesar-ts"
node src/api/nswag-splitter.js "C:\Users\Mert\Desktop\generated.ts" "C:\Users\Mert\caesar-ts\src\api"

REM Check if splitting was successful
if %errorlevel% neq 0 (
    echo Code splitting failed!
    pause
    exit /b 1
)

echo Code splitting completed successfully!
echo All done! Your API files have been generated and split.
pause