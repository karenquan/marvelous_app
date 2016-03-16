![MarvelUniverse](http://vignette1.wikia.nocookie.net/marveldatabase/images/e/e1/The_Marvel_Universe.png/revision/latest?cb=20110513164401)
#MARVELOUS app 
###Planning on Reading a Comic? Make a list!




![](http://i.imgur.com/WcuqFph.jpg)

#Mission Statement  
Provide all MARVEL comic enthusiasts around the unverise a resource to organize their comic lists & collections!



![](http://robot6.comicbookresources.com/wp-content/uploads/2013/11/mu-live-spidey.jpg	)

#The Idea
A Marvel comic centric app that allows users to make custom comic book lists fro themslves and the ability browse the vast Marvel comic library.

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
* 

![MarvelUniverse](http://vignette4.wikia.nocookie.net/marveldatabase/images/d/d2/Earth-616_0001.jpg/revision/latest?cb=20110211050400)


##Technologies & Concept Design


![ERD](https://i.imgur.com/3JWQzkP.jpg)


![](https://i.imgur.com/4aHeynz.png)

![](https://i.imgur.com/MvIHqvF.png)



![](https://i.imgur.com/xZ33fu9.png)

#Routes

| Route  | Method     |                            Path|Access                                   |
|:------:| ----------:|-------------------------------:|-----------------------------------------|
| INDEX  | GET        |/pages/index                    |No Authentication                        |
| SHOW   | GET        |/users/:id                      |Token required                           |
| INDEX  | GET        |/characters                     |No Authentication                        |
| CREATE | POST       |/characters/:id                 |Token required                           |
| SHOW   | GET        |/characters/:id                 |No Authentication                        |
| SHOW   | GET        |/characters/search/:name        |Token required                           |
| SHOW   | GET        |/comics/:id                     |Token required                           |
| CREATE | POST       |/users/:id/lists                |Token required                           |
| DELETE | DESTROY    |/users/:id/lists/:id            |Token required                           |
| UPDATE | PUT/PATCH  |/users/:id/lists/:id            |Token required                           |
| CREATE | POST       |/users/:id/lists/:id/comics     |Token required                           |
| DELETE | DESTROY    |/users/:id/lists/:id/comics/:id |Token required                           |
| CREATE | POST       |/auth/facebook                  |Posts a request for a log in token       |
| INDEX  | GET        |/auth/facebook/callback         |Gets a cookie to be stored in session    |
| DELETE | DESTROY    |/logout                         |Destroys cookie stored in sessio for user|












