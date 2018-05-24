3 tables

Users
  userId          // unique ID for user
  password        // whatever token required 
  userfName       // first name
  userlName       // last name
  userEmail       // 
  photoLink       // link to profile photo/avatar
  userPostsList   // an array of postIds (see below)
  userGroupsList  // an array of groupIds (see below)
  hidePostsLists  // an array of postIds the user doesn't want to see
  hidePeopleList  // an array of userIds the user doesn't want to see

Posts
  postId          // unique ID for message
  groupId         // the forum/wall where the post is posted
  threadId        // each main wall post has a thread number, which is
                  // shared by all replies to the post
  conversationId  // Id of exchanges in each thread.  
                  // 0 for initial open post
  conversationLoc  // each initial reply generates a conversation Id in    
                  // sequence from 1 to n, with the original post having a // zero value
  initiatorId     // the userId of the person who first posted
  correspondent   // the userId of the other person in the conversation
  timestamp       // 
  headline        // this field is omitted in replies
  content         // the text of the post.  

Groups
  groupId         //
  name            //
  shortDescrition //
  longdescription //
  inviteOnly      // true if only way to join is to be invited by a member
  public          // can non-members see posts?
  memberList      // userIds of group members
  postList        // postIds of posts and messages among the group

datastructures



