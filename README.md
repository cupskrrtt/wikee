# Hi, welcome

this app is named wikee. This is a wiki with notion style editor

### To use it for yourself you can clone this repo

```bash

git clone https://github.com/cupskrrtt/wikee

```

create an .env.local file with this entry

```
PB_URL

#Typegen
PB_TYPEGEN_URL
PB_TYPEGEN_EMAIL
PB_TYPEGEN_PASSWORD

```

> the type gen url env entries is used to generate pocketbase types


### Then use your prefered package manager to install the depedency

```bash

npm i

```
or 

```bash

yarn install

```

or 

```bash

pnpm install

```

or 

```bash

bun install

```

### Then start the server

```bash

npm run dev

```

or 

```bash

yarn run dev

```

or 

```bash

pnpm dev

```

or 

```bash

bun dev

```

# Tech used
- Next.js
- Pocketbase
- Shadcn/UI
- Tailwind CSS

# TODO
- [ ] find the perfect color palette
- [ ] create profile tab for creator
- [ ] create favorite page
- [ ] create random search functionality
- [ ] create the search functionality for the search bar
- [ ] create the feature article page
- [ ] add the views to wiki db
- [ ] upgrade the creator dashboard
- [ ] create wiki view page
- [ ] update all the component to have skeleton to improve UX
- [ ] update the wiki create/update update page
