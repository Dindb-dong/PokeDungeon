## How to maintain to our Repository

### 1. Fork our repository. 
- The fork button is on the righ-up side of this web page.
- After you press the button, hit the option named "Create a new fork"!

### 2. Connect your forked repository. 
- Now, make some project folder where you want. (ex: user/Programing)
- And open your code editor. (ex: VScode, etc...)
- Open your 'terminal'. (In VScode, it's in the top menu bar.)
- Copy and paste a code under this line.

```c
git clone <your_repo_url>
//ex: git clone https://github.com/Dindb-dong/PokeDungeon.git
```

### 3. Adding Remote Repo & Checking 
```c
git remote add origin <your_repo_url>
```
- Please check if the files and folders in your repository is cloned well.
```c
git remote -v
```

### 4. Commit and after
- You can make your first commit.
```c
git add .
git commit -m 'first commit'
git push origin main
```
