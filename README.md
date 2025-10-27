This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Instructions

### Deployed Server Address
- [Client - Vercel](https://apollo-assignment-09.vercel.app) : [https://apollo-assignment-09.vercel.app](https://apollo-assignment-09.vercel.app)
- [Server - Vercel](https://apollo-assignment-08.vercel.app) : [https://apollo-assignment-08.vercel.app](https://apollo-assignment-08.vercel.app)

### Github Repo Link
- [Client - Github](https://github.com/foy4748/lost-and-found-nextjs) : [https://github.com/foy4748/lost-and-found-nextjs](https://github.com/foy4748/lost-and-found-nextjs) 
[Server - Github](https://github.com/foy4748/lost-and-found-expressjs) : [https://github.com/foy4748/lost-and-found-expressjs](https://github.com/foy4748/lost-and-found-expressjs)

### Explanation Video Link
- [Google Drive]()


#### Admin Account
```json
{
        "email": "test@test.com",
        "password": "passwordpassword"
}
```

#### User Account
```json
{
        "email": "test2@test.com",
        "password": "passwordpassword"
}
```
First, install the dependencies
```console
pnpm install
```

Copy env.example file to .env.local  file (or .env.production if necessary). Then update .env file using necessary server links and image uploading platform token
```console
cp env.example .env.local
cp env.example .env.production
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
