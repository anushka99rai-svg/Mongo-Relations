# MongoDB Relationships with Mongoose

This project demonstrates core data modeling patterns, relationship strategies, and schema handling (including query population and cascading deletes with middleware) in MongoDB using Mongoose.

---

## 📌 Relationship Approaches Covered

### 1. One-to-Few (Embedded Documents) — `users.js`
- **Pattern:** Embedding subdocuments directly inside the parent document.
- **Use Case:** When related data is bounded, relatively small, and frequently accessed together with the parent document.
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

### 2. One-to-Many (Referenced with `.populate()` & Cascading Delete) — `customer.js`
- **Pattern:** Storing an array of `ObjectId` references to another collection.
- **Use Case:** When child documents can grow in size or need to be queried independently.
- **Features Demonstrated:**
  1. **Referencing & Population:** A customer document references multiple order `ObjectId`s, hydrated via Mongoose's `.populate("orders")`.
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
  2. **Cascading Delete via Mongoose Middleware:** When a customer is deleted using `findByIdAndDelete()`, a `post("findOneAndDelete")` hook runs automatically to delete all linked orders, preventing orphaned records in the database.
     ```javascript
     customerSchema.post("findOneAndDelete", async (customer) => {
       if (customer.orders.length) {
         let result = await Order.deleteMany({ _id: { $in: customer.orders } });
         console.log(result);
       }
     });
     ```

---

### 3. One-to-Squillions (Parent Referencing) — `posts.js`
- **Pattern:** Storing a reference to the parent document inside each child document to prevent exceeding MongoDB's 16MB document limit and array growth issues.
- **Use Case:** When an entity can have thousands or millions of related documents (e.g., social media posts, comments, logs).
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

## 🔄 Summary of Concepts

| Approach | File | Schema Design | Best Used For |
| :--- | :--- | :--- | :--- |
| **One-to-Few** | [`users.js`](./users.js) | Embed subdocument array | Small, bounded data (e.g., addresses, settings) |
| **One-to-Many** | [`customer.js`](./customer.js) | Store array of `ObjectId` refs + `.populate()` | Moderately growing lists, independent queries |
| **Cascading Delete** | [`customer.js`](./customer.js) | `post("findOneAndDelete")` middleware | Cleaning up referenced child documents automatically |
| **One-to-Squillions** | [`posts.js`](./posts.js) | Child references parent `ObjectId` | High-volume data (e.g., posts, comments, logs) |

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

   # One-to-Many (Referenced, Populate & Cascading Delete)
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
