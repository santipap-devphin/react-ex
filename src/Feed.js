
import Post from "./Post"

const Feed = ({posts}) => {

    return (<>
                     {
                            posts.map(data => {
                                return (<Post key={data.id} post={data} />)
                            })
                        }
            </>)

}
export default Feed