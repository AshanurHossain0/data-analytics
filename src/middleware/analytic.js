const axios = require("axios");
const _ = require("lodash");


const analytics = async function (req, res, next) {
    try {
        const config = {
            headers: {
                "x-hasura-admin-secret": "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6"
            }
        }
        axios.get("https://intent-kit-16.hasura.app/api/rest/blogs", config)
            .then(response => {
                const blogs = response.data.blogs;

                if (req.originalUrl === "/api/blog-stats") {
                    const expectedData = {};

                    //Total number of blogs
                    expectedData.totalNumberOfBlogs = _.size(blogs)

                    //The title of the longest blog
                    expectedData.blogHavingLongestTitle = _.maxBy(blogs, blog => blog.title.length).title;

                    //Number of blogs with "privacy" in the title
                    expectedData.numberOfBlogsHavePrivacy = _.filter(blogs, blog => _.includes(blog.title.toLowerCase(), "privacy")).length;

                    //An array of unique blog titles
                    expectedData.blogsHavingUniqueTitle = _.uniqBy(blogs, "title");

                    req.expectedData = expectedData;
                }
                else{
                    let query=req.query.query || "";
                    const expectedData=_.filter(blogs, blog => _.includes(blog.title.toLowerCase(),query.toLowerCase()))
                    req.expectedData = expectedData;
                }

                next();

            })
            .catch((err) => {
                return res.status(404).json({ message: err.message });
            });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = analytics;