
2. when clicking on select date, add a loading state until the page redirected.
3. when there is error redirect to custom error page (city/[id].js)
4. Run again the fetchDataAndUpdateDB script but with better error handaling and treat the missing api calls.. ? 
5. city that not exist in db, instead of reffering to 404 page build dynamic page that will fetch from the original (hebcal) API.
6. Add sitemap https://priver.dev/posts/sitemap-with-next-js


-----------------------------------------------------
How to use?
just type `docker-compose up -d` and go to `localhost:3000`

OLD WAY: (OBSOLOTE)
    docker build -t zmanimOrAnyOtherTagNameYouWouldLike .
    docker run -dp 3222:3000 zmanimOrAnyOtherTagNameYouWouldLike


Credits:
    For the Background I used: https://www.heropatterns.com/