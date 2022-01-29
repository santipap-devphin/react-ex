const NewPost = ({handleSubmit , postTitle , setPostTitle , postBody ,setPostBody}) => {

    return (
                <main className='NewPost'>
                   <h1>NewPost</h1>
                   <form className='newPostForm' onSubmit={(e) => handleSubmit(e)}>
                        <label htmlFor='postTitle'>Title:</label>
                        <input 
                        id='postTitle'
                        type='text'
                        value={postTitle} 
                        onChange={(e) => setPostTitle(e.target.value)}
                        required
                        />
                     <label htmlFor='postBody'>Post:</label>
                      <input 
                        id='postBody'
                        type='text'
                        value={postBody} 
                        onChange={(e) => setPostBody(e.target.value)}
                        required
                       />
                    <button 
                    type="submit"
                    aria-label='Add New Post'
                   
                    > Submit</button>
                   </form>
                </main>
            )
}
export default NewPost