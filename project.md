# Bulletin board app 

This is what we were able to complete.  The original vision is listed below.  #biting off more than you can chew.

#what we wanted to write

# IRL Chat/Meet App

## Functionality:

The purpose of this app is to facilitate spontaneous and real life social interactions between/among users. Tinder meets Meetup meets foursquare meets normal people who aren't psycho.

Users login via Facebook, if possible
    Q: Should we TBA another means of joining?  do we want to reinforce FB monopoly or compete with them?

Users join interest+location groups (i.e., Moms with young kids in 19103 zipcode, KOP mall walkers, Eagles fans in Dallas, ...)
  Users can invite (selected) FB friends to join

Users can carousel/slideshow through group members and select another user with whom to connect directly via (i) videochat (if we can get it working) or (ii) IMs (if we can't get videochat working).

Users can also post "shout outs" to entire group along the lines of "I'm going to Rival Bros. Coffee, anyone want to meet for coffee"

Users can also check into places (as with foursquare) if they want to meet up with other group members at whereever location where the initiating user is at the time.  ("Am at Rival Bros.  Anyone else here?  Want to come out?")

One thing let's NOT have: a wall or group conversation -- if someone responds to a shout out, it should be a direct message with the person who shouted out, rather than a communication with the group.  This should prevent trolling to a large degree.  And it should make trolling less fun, because the trolls (and we've all been there) won't get a reaction from the group.

# We need to mark some things as TBA because we'll never get this done.

## SITE FLOW

Landing page is either a login screen or (if the user has choosen to stay logged in) their user home screen.

### Common Elements

  -header/main nav
  -footer/credits, footer-type links
  -left column/user controls (once user is logged in)

### Page-0: Login Page

Login to be done using Facebook (if possible)

General site information for non-memebrs (i.e., join us with Facebook)

### Page-1: User Home Page

User home page displays:
  -left column: user control features, includes edit profile and some relevant information
  -central screen:
    -groups to which the user already belongs (if any)
    -three ways to access new groups to join:
      -a keyword search box
      -a view all/browse feature (maybe hierarchical)
      -suggested groups (TBA)
    -a button to create a new group.
    -a button to shout our to groups
  -right column:
    messages/invites from other members (who are in common groups with the logged in user)
    column of shoutouts from groups to which the user belongs, sorted by timestamp

  if user selects an existing group:
    go to group page/carousel
  if user selects new group
    go to create group page
  if user selects existing group
    confirm join group
    goto group page
  if user selects search/browse groups
    go to search/browse page
  if user clicks on a shout,
    go to group home page with shout-author as carousel slide

### Page-2: Group Home Page

  -left column
    user control panel
  -center
    -a photo-carousel "swipe screen" appears featuring another member of the group.
      each slide in the carousel shows:
      -photo & profile of another group member
      -an "online now" indicator
      -any current shouts
      -a "chat/message" button that enables chat with that user (either video or text based, depending...)
      -a go to grid button, that replaces carousel with a grid of group members
      next/previous controls
      -don't show me this person again (maybe...is that counter to the philosophy???)
    -Under carousel
      -invite new members to group
      -a way to shoutout to group
      -TBA a "check in" button (for users at locations where group members may be)
  -somewhere
    current shout outs from group members.  Clicking on a member's shoutout will put author of shout in carousel
  -right column
    a 1 by groupsize column of members in the group, showing headshot and name and online status, scrollable -- clicking on person puts them in the current carousel slide.

### Page-3: create/manage group

  -left column
    user control panel
  -center: group management
    form with relevant group information
    -filled out if group is existing
    -to be filled out if new group
  -right side: member management (who manages?  what privileges should they have?)
    -see existing members
    -a tool to remove/suspend members

  On the subject of group management:
    - don't want to allow group organizer to change purpose.  FB groups organizers can change groups, like "Saturday Bowling League" becomes "Sensible Citizens for Cleaner Air" if an organizer changes the group name or description.
    - want to set facilities so that trolls, etc. can be booted, but don't want bannings/suspension to be arbitrary on whim of organizer

### Page-4: create user/edit user profile

  set profile information, photo(s), edit groups to which user belongs

### TBA Page-5: create/edit place profiles

### TBA Page-6: TOS, Acceptable Use, Contact Management, etc.

## Backside Data

  the following SQL tables:

  ### Groups:
    contains list of groups and their attributes and members
    -- ID
    -- name
    -- purpose
    -- member list
    -- manager list
    -- open group/by invite only
    -- ???

  ### Users:
    contains list of users & attributes
    -- ID
    -- name
    -- email
    -- telno
    -- zipcode, home
    -- curlocation
    -- list of groups they belong to and status in group (organizer, member, flags)
    ??

  ### TBA places:
    list of places where members go