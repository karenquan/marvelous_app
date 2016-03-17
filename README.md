 
![MarvelUniverse](http://vignette1.wikia.nocookie.net/marveldatabase/images/e/e1/The_Marvel_Universe.png/revision/latest?cb=20110513164401)
#MARVELOUS app 
###Planning on Reading a Comic? Make a list!  
&nbsp;  
#Mission Statement  
Provide all MARVEL comic enthusiasts around the unverise a resource to organize their comic lists & collections!  
&nbsp;  
#The Idea
A Marvel comic centric app that allows users to make custom comic book lists fro themselves and the ability browse the vast Marvel comic library.
![](http://i.imgur.com/WcuqFph.jpg)
![](http://robot6.comicbookresources.com/wp-content/uploads/2013/11/mu-live-spidey.jpg  )
#Why Marvel?
![](http://www.marketstrategies.com/blog/wp-content/uploads/2015/03/2015-03-marvel1.jpg)
##The Problem
        * Their list is too restricting
        * Their delete doesn't always work.
        * Not all of their comics can be added on a list
We hated how the list on Marve'ls website offered limited ability to sort through titles and the functionality was buggy, and offered almost no user personlization or customzation features..
##The Solution
* More emphasis placed on comics
* A working Add/Delete funciotn
* Offer Customizable lists
* Overall smootther user experience  
![MarvelUniverse](http://vignette4.wikia.nocookie.net/marveldatabase/images/d/d2/Earth-616_0001.jpg/revision/latest?cb=20110211050400)
##Technologies & Concept Design
###ERD Model
![ERD](https://i.imgur.com/3JWQzkP.jpg)  
&nbsp;
###WIREFRAME SKETCHES
![](https://i.imgur.com/4aHeynz.png)
![](https://i.imgur.com/MvIHqvF.png)
![](https://i.imgur.com/iZKBni0.jpg)
![](https://i.imgur.com/6kP64hV.jpg)
![](https://i.imgur.com/WKpSAs3.png)
![](https://i.imgur.com/xZ33fu9.png)
#Routes
| Route  | Method     |                            Path|Access                                   |
|:------:| ----------:|-------------------------------:|-----------------------------------------|
| INDEX  | GET        |/pages/index                    |No Authentication                        |
| SHOW   | GET        |/users/:id                      |Token required                           |
| INDEX  | GET        |/characters                     |No Authentication                        |
| SHOW   | GET        |/characters/:id                 |No Authentication                        |
| SHOW   | GET        |/characters/search/:name        |Token required                           |
| SHOW   | GET        |/comics/:id                     |Token required                           |
| CREATE | POST       |/users/:id/lists                |Token required                           |
| DELETE | DESTROY    |/users/:id/lists/:listId            |Token required                           |
| UPDATE | PUT/PATCH  |/users/:id/lists/:listId            |Token required                           |
| CREATE | POST       |/users/:id/lists/:listId/comics     |Token required                           |
| DELETE | DESTROY    |/users/:id/lists/:listId/comics/:comicId |Token required                           |
| CREATE | POST       |/auth/facebook                  |Posts a request for a log in token       |
| INDEX  | GET        |/auth/facebook/callback         |Gets a cookie to be stored in session    |
| DELETE | DESTROY    |/logout                         |Destroys cookie stored in sessio for user|
#ICEBOX
![](https://i.ytimg.com/vi/9goAudDipQY/hqdefault.jpg)  

#Installation    
### Step 1:    
write:
```
     npm install
```  to the command line.
&nbsp;
### Step 2:  
Enjoy!

#TECHNOLOGIES USED
* HTML/CSS/SASS
* Javascript/jQuery
* Marvel's API
* Git/GitHub
* Heroku
* Facebook Oauth
* MongoDB/Mongoose
* Trello
* MacDown
* Express.js
* Node.js  

##Links
[Trello](https://trello.com/b/BgdIqIcU/marvelous-app)  
[GitHub](https://github.com/watfood/marvelous_app)  
[Pitch Deck](https://docs.google.com/presentation/d/1r2IHGG4VDctmxEzaM2BPD2L1BVgyrXh6ukyoA0xvbPU/edit?usp=sharing)  
##TEAM MEMBERS
![](https://i.imgur.com/7wsxhBS.jpg)
![GA](http://washingtontechnology.org/wp-content/uploads/2014/11/General_Assembly_logo.png)
1 Comment Collapse
Copy it over on the README.md
