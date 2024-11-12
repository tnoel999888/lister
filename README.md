# Lister
https://tnoel999888.github.io/lister/

# Deployment
1. Go to the Repository in Github
2. Go to the "Settings" tab
3. Click "Pages" in the sidebar
4. In the Branch section select branch "gh-pages" (you may have to manually create this branch if it doesn't already exist) and "/(root)"
5. Click "Secrets & variables" in the sidebar
6. Click "Actions" from the submenu
7. Click "New repository secret"
8. Create a new secret called "ACTIONS_DEPLOY" and I think you can set it to be any value (I can't remember what I set mine to)
9. Edit deploy.yml file to contain your Github email address instead of mine
