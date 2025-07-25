# cdsr

**Crash Detection and Safe Route (Road Safety Project)**

> Author - Aditya Modi

**_Project Progress - 25%_**

[Requirements](#Requirements)\
[Contribution By Team](#How-to-Contribute-as-a-Team-Member)\
[Resources](#Resources)

### Important Requirements For Code
The code should be-
1. Optimised for best performance
2. Good UI and UX and responsive according to Phone Sizes
3. Modular (Changing one functionality in code should not affect another functionality)
4. Use JS only (_We can gradually move to **TypeScript**_)

## Requirements

1. **Node.js (LTS)**

   - [ ] [Download and install Node.js (LTS)](https://nodejs.org/en/download)
   - [ ] _(Optional)_ Install Chocolatey with Node.js

2. **JDK 17**

   - [ ] [Install JDK-17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (prefer Oracle JDK-17 only)
   - [ ] Add `JAVA_HOME` variable in System Environment Variables
   - [ ] Add `JAVA_HOME\bin` to Path in System Environment Variables

3. **Android Studio Setup**

   - [ ] [Download and install Android Studio](https://developer.android.com/studio)
   - [ ] Setup `ANDROID_HOME` variable as `C:\Users\Aadii\AppData\Local\Android\Sdk`
   - [ ] Add to Path in User & System Environment Variables
     - `ANDROID_HOME`
     - `ANDROID_HOME\platforms`
     - `ANDROID_HOME\platform-tools`
     - `ANDROID_HOME\build-tools`
     - `ANDROID_HOME\emulator`

4. **React Native Setup**

   - [ ] Setup [React_Native_CLI](https://reactnative.dev/docs/getting-started-without-a-framework)

5. **Additional Learning Resource**
   - [ ] Watch [React_Native_Course_1](https://youtu.be/JKccS9k56_I?si=se3DYezYg3S4zoUm)

## How to Contribute as a Team Member

**Fork → Clone → Create _My_Feature_ Branch → Commit → Push → PR**

For Git Commands - [Git Learning](https://docs.google.com/document/d/1FV9Cnl3CyYi4dUOMgGdILIYHYvIetTWHpcDnNYWQpb0/edit?usp=sharing)

**Important** to keep the changes in _Sync with My_Repo_
- `git remote add upstream https://github.com/Adi-Modi-65/cdsr.git`
- `git pull --rebase upstream main` - _For all branches and commits from the original repo_
- `git push origin main` - _Push the Updated Main Branch to Your Forked GitHub Repo_
- Then make the **Pull Request** to **My_Repo**


Then run commands-
- `cd app`
- `npm install`
- `npm run android`

> [!Note]
> Everyone to use _JS_ initially and later we can move to _TypeScript_

**You can find everything in `src` folder**

## Resources

1. **Dependencies**
   - [react-native-background-actions](https://www.npmjs.com/package/react-native-background-actions)
   - [react-native-contacts](https://www.npmjs.com/package/react-native-contacts)
   - [react-native-geolocation-service](https://www.npmjs.com/package/react-native-geolocation-service)
   - [react-native-immediate-phone-call](https://github.com/wumke/react-native-immediate-phone-call)
   - [react-native-permissions](https://www.npmjs.com/package/react-native-permissions)
   - [react-native-phone-call](https://www.npmjs.com/package/react-native-phone-call)
   - [react-native-sensors](https://www.npmjs.com/package/react-native-sensors)
