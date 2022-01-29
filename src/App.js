import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import {Routes, Route ,useNavigate  } from 'react-router-dom'; /* useNavigate ใช้แทน useHistory ใน version6 */
import {useState , useEffect} from 'react';
import {format} from 'date-fns';
import api from './api/url'
import EditPost from "./EditPost";


function App() {

  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResult , setsearchResult] = useState([]);
  const [postTitle ,setPostTitle] =  useState('');
  const [postBody, setPostBody] = useState('');
  const [Editpost ,setEditpost] =  useState('');
  const [Editbody ,setEditbody] =  useState('');
  let navigate = useNavigate();

  useEffect(() => {

    const fetchitem = async () => {

      try {

        const response = await api.get('/items');

       // console.log(response.data)
        setPosts(response.data);

        
      } catch (err) {

        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }

      }



    }

    fetchitem();

  } ,[])

  useEffect(() => {
    const filterresult = posts.filter(data => 
    ((data.body).toLowerCase()).includes(search.toLowerCase())
    || ((data.title).toLowerCase()).includes(search.toLowerCase()));

    //console.log(search)

    //const filterresult = posts.filter(data => (data.title).includes(search));

    //console.log(filterresult)

    setsearchResult(filterresult.reverse());
  }, [posts , search])


 

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id +1 : 1;

    const datetime = format(new Date() , 'MMMM dd ,yyyy pp');

    const newPost = {id : id , title:postTitle , body:postBody , datetime:datetime};

     try {

        const response = await api.post('/items' , newPost);

        const allPosts = [...posts , response.data];

        setPosts(allPosts);

        setPostTitle('');

        setPostBody('');

        navigate('/');


      
    } catch (err) {

      console.error(err.message);
      
    }

    


  }

  const handleDelete = async (id) => {

    try {

      await api.delete(`/items/${id}`);

      const postsList = posts.filter(post => (post.id !== id));
      
      setPosts(postsList);

      navigate('/');
          
    } catch (err) {

      console.error(err.message)
      
    }

    
  }

  const handleEdit = async (id) => {

    const datetime = format(new Date() , 'MMMM dd ,yyyy pp');

    const Editdata = {id:id , title : Editpost , body:Editbody , datetime:datetime}

    console.log(Editdata)

    try {

      const response = await api.put(`/items/${id}` , Editdata);

      /*const lists = posts.map((data) => {

        if(data.id === id){

          data.title = response.data.title;
          data.body = response.data.body;
          data.datetime = response.data.datetime;
         }
         


         return data;

       }) /* เขียนแบบเช้คเงือนไข ต้อง return ค่าออกมา */

       /*setPosts(lists);*/

      setPosts(posts.map(post => post.id === id ? { ...response.data } : post)); /* การอัพเดท object เขียนอีกรูปแบบนึง */

      setEditpost('');

      setEditbody('');

      navigate('/');


      
    } catch (err) {

      console.log(err.message)
      
    }

    //console.log(id)



  }

  return (
    <div className="App">
         <Header title= "React JS Blog" />
         <Nav search={search} setSearch={setSearch}/>
            <Routes>
                <Route path="/" element={ <Home posts={searchResult} />} />
                <Route path="/post" element={<NewPost  handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}/>} />
                <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
                <Route path="/about" element={<About />} />
                <Route path="/edit/:id" element={<EditPost handleEdit={handleEdit} posts={posts} Editpost={Editpost} setEditpost={setEditpost} Editbody={Editbody} setEditbody={setEditbody} />} />
                <Route path="*" element={<Missing />} />
                
            </Routes>
        <Footer />
    </div>
  );
}

export default App;
