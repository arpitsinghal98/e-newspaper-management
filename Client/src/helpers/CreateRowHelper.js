// helpers.js

export const renderInputFields = (selectedTable, handleInputChange) => {
    switch (selectedTable) {
        case "article":
          return (
            <div>
              <div>
                <label htmlFor="article_id">article_id:</label>
                <input
                  type="text"
                  id="article_id"
                  onChange={(e) => handleInputChange(e, "article_id")}
                />
              </div>
              <div>
                <label htmlFor="title">title:</label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => handleInputChange(e, "title")}
                />
              </div>
              <div>
                <label htmlFor="content">content:</label>
                <textarea
                  id="content"
                  onChange={(e) => handleInputChange(e, "content")}
                />
              </div>
              <div>
                <label htmlFor="published_date">published_date:</label>
                <input
                  type="date"
                  id="published_date"
                  onChange={(e) => handleInputChange(e, "published_date")}
                />
              </div>
              <div>
                <label htmlFor="likes">likes:</label>
                <input
                  type="number"
                  id="likes"
                  onChange={(e) => handleInputChange(e, "likes")}
                />
              </div>
              <div>
                <label htmlFor="number_of_comments">number_of_comments:</label>
                <input
                  type="number"
                  id="number_of_comments"
                  onChange={(e) => handleInputChange(e, "number_of_comments")}
                />
              </div>
              <div>
                <label htmlFor="number_of_views">number_of_views:</label>
                <input
                  type="number"
                  id="number_of_views"
                  onChange={(e) => handleInputChange(e, "number_of_views")}
                />
              </div>
              <div>
                <label htmlFor="category_id">category_id:</label>
                <input
                  type="number"
                  id="category_id"
                  onChange={(e) => handleInputChange(e, "category_id")}
                />
              </div>
              {/* Add other input fields for the article table */}
            </div>
          );
        case "category":
          return (
            <div>
              <div>
                <label htmlFor="category_id">category_id:</label>
                <input
                  type="number"
                  id="category_id"
                  onChange={(e) => handleInputChange(e, "category_id")}
                />
              </div>
              <div>
                <label htmlFor="category_name">category_name:</label>
                <input
                  type="text"
                  id="category_name"
                  onChange={(e) => handleInputChange(e, "category_name")}
                />
              </div>
              {/* Add other input fields for the category table */}
            </div>
          );
        case "comments":
          return (
            <div>
              <div>
                <label htmlFor="comment_id">comment_id:</label>
                <input
                  type="text"
                  id="comment_id"
                  onChange={(e) => handleInputChange(e, "comment_id")}
                />
              </div>
              <div>
                <label htmlFor="date_posted">date_posted:</label>
                <input
                  type="date"
                  id="date_posted"
                  onChange={(e) => handleInputChange(e, "date_posted")}
                />
              </div>
              <div>
                <label htmlFor="content">content:</label>
                <textarea
                  id="content"
                  onChange={(e) => handleInputChange(e, "content")}
                />
              </div>
              <div>
                <label htmlFor="number_of_likes">number_of_likes:</label>
                <input
                  type="number"
                  id="number_of_likes"
                  onChange={(e) => handleInputChange(e, "number_of_likes")}
                />
              </div>
              <div>
                <label htmlFor="number_of_replies">number_of_replies:</label>
                <input
                  type="number"
                  id="number_of_replies"
                  onChange={(e) => handleInputChange(e, "number_of_replies")}
                />
              </div>
              <div>
                <label htmlFor="user_id">user_id:</label>
                <input
                  type="text"
                  id="user_id"
                  onChange={(e) => handleInputChange(e, "user_id")}
                />
              </div>
              <div>
                <label htmlFor="article_id">article_id:</label>
                <input
                  type="text"
                  id="article_id"
                  onChange={(e) => handleInputChange(e, "article_id")}
                />
              </div>
              {/* Add other input fields for the comments table */}
            </div>
          );

          case "editor":
            return (
              <div>
                <div>
                  <label htmlFor="editor_id">editor_id:</label>
                  <input
                    type="text"
                    id="editor_id"
                    onChange={(e) => handleInputChange(e, "editor_id")}
                  />
                </div>
                <div>
                  <label htmlFor="name">name:</label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                </div>
                <div>
                  <label htmlFor="email">email:</label>
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => handleInputChange(e, "email")}
                  />
                </div>
                <div>
                  <label htmlFor="department_name">department_name:</label>
                  <input
                    type="text"
                    id="department_name"
                    onChange={(e) => handleInputChange(e, "department_name")}
                  />
                </div>
              </div>
            );
      
          case "journalist":
            return (
              <div>
                <div>
                  <label htmlFor="journalist_id">journalist_id:</label>
                  <input
                    type="text"
                    id="journalist_id"
                    onChange={(e) => handleInputChange(e, "journalist_id")}
                  />
                </div>
                {/* ... other input fields for journalist table ... */}
              </div>
            );
      
          case "subscription plans":
            return (
              <div>
                <div>
                  <label htmlFor="plan_id">plan_id:</label>
                  <input
                    type="text"
                    id="plan_id"
                    onChange={(e) => handleInputChange(e, "plan_id")}
                  />
                </div>
                {/* ... other input fields for subscription plans table ... */}
              </div>
            );
      
          case "user":
            return (
              <div>
                <div>
                  <label htmlFor="user_id">user_id:</label>
                  <input
                    type="text"
                    id="user_id"
                    onChange={(e) => handleInputChange(e, "user_id")}
                  />
                </div>
                {/* ... other input fields for user table ... */}
              </div>
            );

        
        // Add cases for other tables (editor, journalist, etc.)
        default:
          return null;
    }
  };