# Travel Planner

**Venture Vista** is a travel planner that helps you explore and plan potential locations to visit at your destination.

## Technologies
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Drizzle ORM
- OpenAI API
- Google Places API
- Redis


## Features 
- Generate travel location suggestions based on a destination
- AI-powered recommendations for places combined with real-world location data from Google Places API
- Temporary caching of results using Redis
- Desktop & Mobile friendly

## Technical Challenges & Learnings
This projects was built over the of roughly a year course of a year to learn more about how to interact with AI and real content APIs such as the Google Places API. 

I ran into a lot of problems with the parsing the data from the OpenAI API and making it return consistent answers. This required to lower the the creativity parameter for the AI and crafting clearer prompts with well defined objectives

Another problem I ran into was request timeouts since Vercel only allows 10s on the Hobby plan. The workaround was to use edge function that allows for 25 seconds of runtime until timeout.

## Prerequisites
- Upstash Redis 

## Environment Variables
Create a `.env` file in the root of the project and provide the following variables:
```env
OPENAI_API_KEY=your_openai_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key
UPSTASH_REDIS_REST_URL="your_redis_rest_url"
UPSTASH_REDIS_REST_TOKEN="your_redis_rest_token"
```
You can use `.env.example` as a template.

## Running the Project
1. Clone the Repository
2. Install dependencies: `pnpm install`
3. Push the schema to the db: `pnpm drizzle-kit generate` and `pnpm drizzle-kit migrate`
4. Start the development server: `pnpm dev`
5. Navigate to http://localhost:3000 in your browser
   
## Preview
https://github.com/user-attachments/assets/daa9e799-1209-4176-984b-26a62b8d7224
