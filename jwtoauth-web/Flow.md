
#####   ************************************************
### Index.js

    starting point where following configuration been done
    
    >>> redux 
        (for manage applicatin state)
    >>> cookie 
        (for storing token and basic details)
    >>> Routing
    >>> history 
        (to allow user to move or jump on diff location)
    
    Router > Only take one component so we had given our app(MyApplication).
#####   ************************************************
### MyApplication
    
    > 1: componentWillMount
        checkLoginStatus method will be call it will take cookie
        and try to check is user is exist or not 
        based on method response it will set following three fields:
        
        1: authenticationProcess: "done"
            always when process finis it will be mark as done 
            so we can process render code otherwise we will return null.
        
        2: isAuthenticated: true/false
            based on this field it will decide which component to 
            execute from following
                1: <UnAuthenticatedUser/>
                1: <AuthenticatedUser/>
            
            if AuthenticatedUser is call we are also setting 
            some set of UI and admin role to allow/disallow 
            links
            
        3: currentLogin
            If authentication successed backend will give
            some set of user details to identify which details
            to show based on role...
            
#####   ************************************************            
### To add/enable more apis
    
    Back-end:
    ---------
    To add/enable more api need to create endpoint as created 
    for addTask and remove task in backend using annotation
    
    Front-end:
    ---------
    Then we have to make changes inside MyApplication.constructor.state
    and need to add object like following inside adminLinks/userLinks:
    
    {
        link: "/add-task",
        displayName: "Add Task",
    }
    
    link : where it will throw user to specified link
    displayName : will display text for nav bar
    
    last we have to make changes inside <AuthenticatedUser/>
    component where based on admin/user add condition based component
    
    That's at
#####   ************************************************    
### Ending

    Once we have logged in component we can perform all basic flow
    and it will be handled, there will no changes..
#####   ************************************************
    
    
    
    
    
    
    
    
                   
             
        
        
                   