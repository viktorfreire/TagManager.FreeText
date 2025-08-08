This PCF control enables users to input tags as free text, using commas (,) as separators. Optionally, the field can be set to read-only without requiring Field Security Profiles in D365.

🛠️ How to Build
1. Open the main folder TagManager.FreeText in Visual Studio Code.
2. Launch a terminal within Visual Studio Code.
3. From the root folder, run the following commands in order:
    - npm run refreshTypes
    - npm run build (for debugging)
    - npm run build -- --buildMode production (for release)
4. Navigate to the Solutions\TagManagerFreeText folder.
5. From this folder, execute:
    - pac solution version --strategy Solution (only if you need to increment the solution version for D365 import)
    - msbuild /t:restore
    - msbuild (to generate the unmanaged solution)
    - msbuild /p:configuration=Release (to generate the managed solution)
6. Access the bin folder to retrieve the solution packages:
    - Debug folder contains the unmanaged solution.
    - Release folder contains the managed solution.

🛠️ How to use it
1. Click on change properties of the Single Line of Text field, navigate to Controls tab and then add them more then search by TagManagerFreeText and add it.
2. It will convert your text field into beautiful multiple tags control.

🤝 Want to Collaborate?
Visit the GitHub repository: https://github.com/viktorfreire/TagManager.FreeText