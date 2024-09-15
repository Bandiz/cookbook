# login page
- [ ] design, layout
- [ ] error page/error pop-up if failed to login
- [ ] restore password?
- [ ] google login

# home page
- [ ] carousel (featured recipes only)
- [ ] list of categories and recipes, ie featured categories listed, each category (clickable) row with 3-5 recipes (clickable) listed

# categories page (public)
- [ ] overview of all categories (main image + name tiles)
  - [ ] onClick navigate to public category page

# category page (public)
- [ ] category has it's own recipes listed (main image + name + details as tiles)
  - [ ] onClick navigate to recipe page

# recipes page (public)
- [ ] group recipes by category 
  - [ ] side panel: All -> rest categories listed vertically. 
  - [ ] On all 'category', main layout: display featured categories with n recipies
  - [ ] On specific categories list all recipes as a tiled list

# admin page 
## categories tab
- [ ] add featured flag
  - [ ] quick action to toggle flag
  - [ ] edit page: checkbox
  - [ ] create page: checkbox

## recipies tab
- [ ] add featured flag
  - [ ] quick action to toggle flag
  - [ ] edit page: checkbox
  - [ ] create page: checkbox
- [ ] instructions could have 0 to many images (same endpoint as main image drawer)

## users tab
- [ ] CRUD operations
- [ ] Assign roles

## images tab
- [ ] CRUD operations
- [ ] images separated by where they are attached (eg. instruction, category, recipe main image etc)

## import tab
- [ ] export select data
- [ ] import (handle conflicts)

# profile page 
- [ ] saved recipes
- [ ] change password?

# initialize database
- [x] setup collections script

# structured error messages
- [x] return validated model, no excess information (like ModelState - traceid)

# admin warnings
- [ ] warnings/notifications about incomplete data (e.g. missing main image)