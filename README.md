# MongoDB Relationships with Mongoose

This project demonstrates core data modeling patterns and relationship strategies in MongoDB using Mongoose.

---

## 📌 Relationship Approaches Covered

### 1. One-to-Few (Embedded Documents) — `users.js`
- **Pattern:** Embedding subdocuments directly inside the parent document.
- **Use Case:** When related data is bounded, relatively small, and frequently accessed with the parent document.
- **Example:** Storing multiple addresses inside a single user document.
  ```javascript
  const userSchema = new Schema({
    name: String,
    email: String,
    address: [
      {
        _id: false,
        location: String,
        city: String
      }
    ]
  });
  ```

---

### 2. One-to-Many (Referenced with `.populate()`) — `customer.js`
- **Pattern:** Storing an array of `ObjectId` references to another collection.
- **Use Case:** When the child documents can grow or are queried independently.
- **Example:** A customer placing multiple orders, using Mongoose's `.populate("orders")` to hydrate referenced documents.
  ```javascript
  const customerSchema = new Schema({
    name: String,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order"
      }
    ]
  });
  ```

---

### 3. One-to-Squillions (Parent Referencing) — `posts.js`
- **Pattern:** Storing a reference to the parent document inside each child document to prevent 16MB document limit and array explosion.
- **Use Case:** When an entity can have thousands or millions of related documents (e.g., social media posts, comments, activity logs).
- **Example:** Posts referencing their account holder (`AccHolder`).
  ```javascript
  const postSchema = new Schema({
    content: String,
    like: Number,
    accHolder: {
      type: Schema.Types.ObjectId,
      ref: "AccHolder"
    }
  });
  ```

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017`

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd relations
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run individual examples:**
   ```bash
   # One-to-Few (Embedded)
   node users.js

   # One-to-Many (Referenced & Populate)
   node customer.js

   # One-to-Squillions (Parent Reference)
   node posts.js
   ```

---

## 📦 Tech Stack

- **Runtime:** Node.js
- **Database:** MongoDB
- **ODM:** [Mongoose](https://mongoosejs.com/)
- **Framework:** Express.js
