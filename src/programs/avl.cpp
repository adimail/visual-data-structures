// C++ Program for AVL tree

// Author: Aditya Godse (https://github.com/adimail)

#include <iostream>
using namespace std;

class AVLNode
{
public:
    int key;
    int height;
    AVLNode *left;
    AVLNode *right;

    AVLNode(int k) : key(k), height(1), left(nullptr), right(nullptr) {}
};

class AVLTree
{
private:
    AVLNode *root;

    int height(AVLNode *node)
    {
        return (node != nullptr) ? node->height : 0;
    }

    int balance(AVLNode *node)
    {
        return (node != nullptr) ? height(node->left) - height(node->right) : 0;
    }

    AVLNode *rotateRight(AVLNode *y)
    {
        AVLNode *x = y->left;
        AVLNode *T2 = x->right;

        x->right = y;
        y->left = T2;

        y->height = 1 + max(height(y->left), height(y->right));
        x->height = 1 + max(height(x->left), height(x->right));

        return x;
    }

    AVLNode *rotateLeft(AVLNode *x)
    {
        AVLNode *y = x->right;
        AVLNode *T2 = y->left;

        y->left = x;
        x->right = T2;

        x->height = 1 + max(height(x->left), height(x->right));
        y->height = 1 + max(height(y->left), height(y->right));

        return y;
    }

public:
    AVLTree(int key) : root(new AVLNode(key)) {}

    AVLNode *insert(AVLNode *node, int key)
    {
        if (node == nullptr)
            return new AVLNode(key);

        if (key < node->key)
            node->left = insert(node->left, key);
        else if (key > node->key)
            node->right = insert(node->right, key);
        else
            return node; // Duplicate keys are not allowed

        node->height = 1 + max(height(node->left), height(node->right));

        int balanceFactor = balance(node);

        // Left Heavy
        if (balanceFactor > 1)
        {
            if (key < node->left->key)
                return rotateRight(node);
            else
            {
                node->left = rotateLeft(node->left);
                return rotateRight(node);
            }
        }

        // Right Heavy
        if (balanceFactor < -1)
        {
            if (key > node->right->key)
                return rotateLeft(node);
            else
            {
                node->right = rotateRight(node->right);
                return rotateLeft(node);
            }
        }

        return node;
    }

    void insert(int key)
    {
        root = insert(root, key);
    }

    AVLNode *search(AVLNode *node, int key)
    {
        if (node == nullptr || node->key == key)
            return node;

        if (key < node->key)
            return search(node->left, key);
        else
            return search(node->right, key);
    }

    void displayRoot()
    {
        if (root)
            cout << root->key << endl;
        else
            cout << "Tree is empty" << endl;
    }

    void inorder(AVLNode *node)
    {
        if (node)
        {
            inorder(node->left);
            cout << node->key << " ";
            inorder(node->right);
        }
    }

    void preorder(AVLNode *node)
    {
        if (node)
        {
            cout << node->key << " ";
            preorder(node->left);
            preorder(node->right);
        }
    }

    void postorder(AVLNode *node)
    {
        if (node)
        {
            postorder(node->left);
            postorder(node->right);
            cout << node->key << " ";
        }
    }

    void inorder()
    {
        inorder(root);
        cout << endl;
    }

    void preorder()
    {
        preorder(root);
        cout << endl;
    }

    void postorder()
    {
        postorder(root);
        cout << endl;
    }

    AVLNode *getRoot()
    {
        return root;
    }
};

int main()
{
    AVLTree avlTree(45);

    avlTree.insert(13);
    avlTree.insert(16);
    avlTree.insert(8);
    avlTree.insert(65);
    avlTree.insert(55);
    avlTree.insert(40);
    avlTree.insert(19);

    cout << "Preorder traversal list   : ";
    avlTree.preorder();
    cout << "Postorder traversal list  : ";
    avlTree.postorder();
    cout << "Inorder traversal list    : ";
    avlTree.inorder();

    int elementToSearch;
    cout << "\nEnter an element to search in the AVL tree: ";
    cin >> elementToSearch;

    if (avlTree.search(avlTree.getRoot(), elementToSearch) != nullptr)
        cout << "Element " << elementToSearch << " is present in the AVL tree" << endl;
    else
        cout << "Element " << elementToSearch << " is not present in the AVL tree" << endl;

    return 0;
}
