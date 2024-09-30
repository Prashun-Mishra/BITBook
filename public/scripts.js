

// Function to show alerts
function showAlert(message, type = 'success') {
    const alertElement = document.createElement('div');
    alertElement.className = `alert ${type}`;
    alertElement.textContent = message;
    document.body.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 5000);
}


function createPostElement(post) {
    const postElement = document.createElement('li');
    postElement.className = 'post-item';
    const date = new Date(post.createdAt).toLocaleString();
    postElement.innerHTML = `
        <div class="post-content">${post.content}</div>
        <div class="post-date"><strong>Posted on:</strong> ${date}</div>
    `;
    return postElement;
}



function showEditProfileForm() {
    document.getElementById('edit-profile-form').style.display = 'block';
}

function hideEditProfileForm() {
    document.getElementById('edit-profile-form').style.display = 'none';
}

function clearSearchResults() {
    document.getElementById('search-results').innerHTML = '';
}


// Function to register a new user
async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (response.ok) {
            showAlert('Registration successful! You can now login.', 'ok');
            window.location.href = 'login.html'; 
        } else {
            const errorMessage = await response.text();
            showAlert(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        showAlert('An error occurred during registration. Please try again later.', 'error');
    }
}

// Function to login a user
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem('token', token);
            showAlert('Login successful!', 'ok');
            window.location.href = 'create-post.html'; 
        } else {
            const errorMessage = await response.text();
            showAlert(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Error during login:', error);
        showAlert('An error occurred during login. Please try again later.', 'error');
    }
}

// Function to create a new post
async function createPost() {
    const content = document.getElementById('content').value;
    const visibility = document.getElementById('visibility').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ content, visibility })
        });
        if (response.ok) {
            showAlert('Post created successfully', 'ok');
            window.location.href = 'profile.html'; 
        } else {
            const errorMessage = await response.text();
            showAlert(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Error creating post:', error);
        showAlert('An error occurred while creating the post. Please try again later.', 'error');
    }
}

async function loadProfile() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/profile', {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        if (response.ok) {
            const { user, posts } = await response.json();
            document.getElementById('name').innerText = user.name;
            document.getElementById('email').innerText = user.email;
            document.getElementById('bio').innerText = user.bio;  // Add bio
            document.getElementById('gender').innerText = user.gender;  // Add gender
            document.getElementById('profession').innerText = user.profession;  // Add profession

            const postList = document.getElementById('post-list');
            postList.innerHTML = ''; // Clear previous posts
            posts.forEach(post => {
                const listItem = createPostElement(post);

                // Edit button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => editPost(post._id);

                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deletePost(post._id);

                // Append edit and delete buttons to post item
                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);

                postList.appendChild(listItem);
            });
        } else {
            console.error('Failed to load profile:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }}

// async function loadProfile() {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('/profile', {
//             method: 'GET',
//             headers: {
//                 'Authorization': token
//             }
//         });
//         if (response.ok) {
//             const { user, posts } = await response.json();
//             document.getElementById('name').innerText = user.name;
//             document.getElementById('email').innerText = user.email;
//             document.getElementById('bio').innerText = user.bio;  
//             document.getElementById('gender').innerText = user.gender;  
//             document.getElementById('profession').innerText = user.profession; 

//             const postList = document.getElementById('post-list');
//             postList.innerHTML = ''; 
//             posts.forEach(post => {
//                 const listItem = createPostElement(post);

//                 // Edit button
//                 const editButton = document.createElement('button');
//                 editButton.textContent = 'Edit';
//                 editButton.onclick = () => editPost(post._id);

//                 // Delete button
//                 const deleteButton = document.createElement('button');
//                 deleteButton.textContent = 'Delete';
//                 deleteButton.onclick = () => deletePost(post._id);

//                 // Append edit and delete buttons to post item
//                 listItem.appendChild(editButton);
//                 listItem.appendChild(deleteButton);

//                 postList.appendChild(listItem);
//             });
//         } else {
//             console.error('Failed to load profile:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error loading profile:', error);
//     }
// }


async function updateProfile() {
    const bio = document.getElementById('edit-bio').value;
    const gender = document.getElementById('edit-gender').value;
    const profession = document.getElementById('edit-profession').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/profile/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ bio, gender, profession })
        });
        if (response.ok) {
            showAlert('Profile updated successfully');
            loadProfile(); // Reload profile data
            hideEditProfileForm(); // Hide the form
        } else {
            showAlert('Failed to update profile', 'error');
            console.error('Failed to update profile:', response.statusText);
        }
    } catch (error) {
        showAlert('An error occurred while updating profile', 'error');
        console.error('Error updating profile:', error);
    }
}






//Function to search for users
async function searchUsers() {
    const query = document.getElementById('search-query').value;
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/search/users?query=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        if (response.ok) {
            const users = await response.json();
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';
            users.forEach(user => {
                const listItem = document.createElement('li');
            
                
                listItem.innerHTML = `
                <strong>Name:</strong> ${user.name}<br>
                <strong>Email:</strong> ${user.email}<br>
                <strong>Bio:</strong> ${user.bio || 'N/A'}<br>
                <strong>Gender:</strong> ${user.gender || 'N/A'}<br>
                <strong>Profession:</strong> ${user.profession || 'N/A'}
            `;

                listItem.onclick = () => {viewUserProfile(user._id);
                    clearSearchResults(); 
                }
                searchResults.appendChild(listItem);
            });
        } else {
            console.error('Failed to search users:', response.statusText);
        }
    } catch (error) {
        console.error('Error searching users:', error);
    }
}

async function viewUserProfile(userId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/search/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        if (response.ok) {
            const { user, posts } = await response.json();

            const nameElement = document.getElementById('searched-name');
            const emailElement = document.getElementById('searched-email');
            const bioElement = document.getElementById('searched-bio');
            const genderElement = document.getElementById('searched-gender');
            const professionElement = document.getElementById('searched-profession');
            const searchedPostList = document.getElementById('searched-post-list');
           

            if (nameElement && emailElement && bioElement && genderElement && professionElement && searchedPostList) {
                nameElement.innerText = user.name;
                emailElement.innerText = user.email;
                bioElement.innerText = user.bio || 'N/A';
                genderElement.innerText = user.gender || 'N/A';
                professionElement.innerText = user.profession || 'N/A';

                searchedPostList.innerHTML = '';
                posts.forEach(post => {
                    const listItem = createPostElement(post);
                    searchedPostList.appendChild(listItem);
                });


                document.getElementById('searched-user-profile').style.display = 'block';
            } else {
                console.error('One or more elements for displaying user profile are missing.');
            }
        } else {
            console.error('Failed to load user profile:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}


// Function to edit a post
async function editPost(postId) {
    const newContent = prompt('Enter new content:');
    if (!newContent) return;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ content: newContent })
        });
        if (response.ok) {
            showAlert('Post updated successfully', 'ok');
            loadProfile(); 
        } else {
            const errorMessage = await response.text();
            showAlert(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Error editing post:', error);
        showAlert('An error occurred while editing the post. Please try again later.', 'error');
    }
}

// Function to delete a post
async function deletePost(postId) {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });
        if (response.ok) {
            showAlert('Post deleted successfully', 'ok');
            loadProfile();
        } else {
            const errorMessage = await response.text();
            showAlert(errorMessage, 'error');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        showAlert('An error occurred while deleting the post. Please try again later.', 'error');
    }
}

window.onload = function() {
    loadProfile();
    loadFollowers();
    loadFriends();
    
}

