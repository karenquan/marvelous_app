 
# MARVELOUS app 
### Planning on Reading a Comic? Make a list!

![MarvelUniverse](http://vignette1.wikia.nocookie.net/marveldatabase/images/e/e1/The_Marvel_Universe.png/revision/latest?cb=20110513164401)  
# The Mission 
A Marvel comic centric app that allows users to make custom comic book lists for themselves, and browse the vast Marvel comic library. This would provide all Marvel comic enthusiasts around the universe a resource to organize their comic lists and collections!


# Why Marvel?
![](http://www.marketstrategies.com/blog/wp-content/uploads/2015/03/2015-03-marvel1.jpg)
The graph speak for itself. The interest in Marvel Comics and Characters make it the best choice for developing a comic app of this kind.


## The Approach

After reviewing the vast choices of API options to base our app upon, we came across the Marvel Comics API, and it looked to be a natural fit for all the team members.  We registered for the API key, and had each team member play with it and confirm that belief.  One thing all members agreed upon was that the API had an abundance of great information. However, the difficulty of accessing that information, even on Marvel's own website, proved to be difficult and limited.

We felt this was the opportunity and challenge we were looking for.  We knew we could create a much easier way to use their website, as well as provide an aesthetic fitting to the Marvel Comics brand (by using Marvel's rich character and cover art).


#Challenges
### Limitiations of Marvel's Website


* Inconsistency in the ability to add a comic to our lists:  
 <img src="https://i.imgur.com/XYFUvr2.jpg" width="400">  
 <img src="https://i.imgur.com/Yar5KtS.jpg" width="400">  
 <img src="https://i.imgur.com/ofFRoPi.jpg" width="400">



* Inconsistencies in a successful comic deletion from our list
* Restriction to only 3 lists that Marvel provides: "My Must-Reads," "My Collection," and "Digital Comics I've Read."

We did not like Marvel's lack of user personlization or customzation features.

#Our Solution
* More emphasis placed on the comics
* A working Add/Delete function
* Customizable lists option
* Overall smoother user experience  
![MarvelUniverse](http://vignette4.wikia.nocookie.net/marveldatabase/images/d/d2/Earth-616_0001.jpg/revision/latest?cb=20110211050400) 





##Technologies & Concept Design

###ERD Model  
<img src="https://i.imgur.com/3JWQzkP.jpg" width="600">
###WIREFRAME SKETCHES
<img src="https://i.imgur.com/4aHeynz.png" width="400">
###WORKING HOME PAGE
![](https://i.imgur.com/n5GAqyA.png)

###Character Page Wireframe
<img src="https://i.imgur.com/xZ33fu9.png" width="400">

###Character Page
![](https://i.imgur.com/iZKBni0.jpg)

###Profile Comic Lists
![](https://i.imgur.com/6kP64hV.jpg)

###Search Index
![](https://i.imgur.com/WKpSAs3.png)


##Completed Project Goals
**[ x ]   Successful connection to Marvel's API**    
**[ x ]   A clean, modern, and intuitive user interface**   
**[ x ]   Ability to add any comic to a custom list**    
**[ x ] 	An organized** **structure to make browsing thousands of comics easy (browse by a character's name)**  
**[ x ] Character search function**  


# RESTful API Routes  


| Route  | Method     |                            Path|Access                                   |
|:------:| :----------:|-------------------------------:|-----------------------------------------|
| INDEX  | `GET`        |`/pages/index`                    |No Authentication                        |
| SHOW   | `GET`        |`/users/:id`                      |Token required                           |
| INDEX  | `GET`        |`/characters`                     |No Authentication                        |
| SHOW   | `GET`        |`/characters/:id`                 |No Authentication                        |
| SHOW   | `GET`        |`/characters/search/:name`        |No Authentication                           |
| SHOW   | `GET`        |`/comics/:id`                     |No Authentication                           |
| CREATE | `POST`       |`/users/:id/lists`                |Token required                           |
| DELETE | `DESTROY`    |`/users/:id/lists/:listId`            |Token required                       |
| UPDATE | `PUT/PATCH`  |`/users/:id/lists/:listId`            |Token required                       |
| CREATE | `POST`       |`/users/:id/lists/:listId/comics`     |Token required                       |
| DELETE | `DESTROY`    |`/users/:id/lists/:listId/comics/:comicId` |Token required                  |
| CREATE | `POST`       |`/auth/facebook`                  |Posts a request for a log in token       |
| INDEX  | `GET`        |`/auth/facebook/callback`         |Gets a cookie to be stored in session    |
| DELETE | `DESTROY`    |`/logout`                         |Destroys cookie stored in sessio for user|

#Installation  
###BEFORE STARTING, MAKE SURE YOU HAVE [NODEMON](http://nodemon.io/) and [MONGODB](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/) installed and an [.env](#env) file at folder of the app.  
 
###Step 1:  
Fork the repo to your own account.  
**Click fork:**  
![img](https://i.imgur.com/i1lNV0L.png)  
**Choose your account or the account you want to use:**  
![img](https://i.imgur.com/aaKZMUI.png)  
  
###Step 2:  
**Clone the repo to your own account:**  
``` git clone [insert ssh of the repo] ```  
 
***Note: You should see your username on the ssh like this:**  
![img](https://i.imgur.com/9Bi8bPG.png)  

###Step 3:  
**cd into the folder and run:**  
```npm install ``` on the command line.  
&nbsp;  
###Step 4:  
**Open two new tabs on the command line.**  
run ``` mongod ``` on the first one.  
run ``` nodemon ``` on the second one.  
&nbsp;  
###Step 5: 
Go to ```http://localhost:3000/```  
&nbsp;  
###Step 6:  
Enjoy!  
&nbsp;  
&nbsp; 

##<a name="env"></a>ENV  
**The MARVELOUS app utilizes the Marvel API & Facebook OAuth (for Authentication).**   

**For the `.env` file, you'll need to have:**
  
	MARVEL_PUBLIC_KEY=[insert public key]  
	MARVEL_PRIVATE_KEY=[insert private key]  
	FACEBOOK_APP_ID=[insert App ID] 
	FACEBOOK_APP_SECRET=[insert AP Secret]  
	FACEBOOK_CALLBACK=[insert callback]  
  
* Sign up to get a marvel API key at [Marvel](http://developer.marvel.com/)  
* Sign up to get the facebook keys at [Facebook](https://developers.facebook.com)  
* Instructions to install facebook passport are here: [Facebook passport](https://github.com/jaredhanson/passport-facebook)
 <br>
 <br>

#TECHNOLOGIES USED
* **HTML/EJS**  - Structure/Templating
* **CSS/SASS**  - Styling
* **Javascript/jQuery**  - Functionality & user experience
* **Marvel's API**  - Resource for comic data & comic images
* **Git/GitHub**  - Management of repos
* **Heroku**  - Host for app deployment to the public
* **Facebook Oauth**  - Authentication/registration for user login
* **MongoDB/Mongoose**  - Database, Database Wrapper
* **Trello**  - Organzation of user stories
* **MacDown**  - README
* **Express.js**  - Application framework
* **Node.js** - Serverside web application  
<br>

##Links
[Trello](https://trello.com/b/BgdIqIcU/marvelous-app)  
[GitHub](https://github.com/watfood/marvelous_app)  
[Pitch Deck](https://docs.google.com/presentation/d/1r2IHGG4VDctmxEzaM2BPD2L1BVgyrXh6ukyoA0xvbPU/edit?usp=sharing)  
[Link to the app](https://shrouded-stream-53504.herokuapp.com)
<br>

##Challenges
* Marvel's API 
  * Inconsistent data return
* Heroku deployment
* Distribution of duties & roles
* Communication amongst team members



##TEAM MEMBERS

![](https://i.imgur.com/7wsxhBS.jpg)  

#Next Steps:
![](https://i.ytimg.com/vi/9goAudDipQY/hqdefault.jpg)  


**[ ] Comic rating system**   
**[ ] User comments on comics**     
**[ ] Ability for users to see other users' comic lists**    
**[ ] Expansion beyond Marvel Comic library (ultimate comic book list)**  

![GA](http://washingtontechnology.org/wp-content/uploads/2014/11/General_Assembly_logo.png)
