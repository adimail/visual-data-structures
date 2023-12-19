// C++ Program for binary search tree

// Author: Aditya Godse (https://github.com/adimail)

#include <iostream>

class Node
{
public:
    int key;
    Node *left;
    Node *right;

    Node(int key) : key(key), left(nullptr), right(nullptr) {}
};

class BinarySearchTree
{
public:
    Node *root;
    int leafNodes;
    int height;

    BinarySearchTree(int key) : root(new Node(key)), leafNodes(0), height(0) {}

    Node *insert(int key, Node *currentNode = nullptr)
    {
        if (currentNode == nullptr)
        {
            return new Node(key);
        }

        if (key < currentNode->key)
        {
            currentNode->left = insert(key, currentNode->left);
        }
        else if (key > currentNode->key)
        {
            currentNode->right = insert(key, currentNode->right);
        }

        return currentNode;
    }

    Node *search(int key, Node *currentNode = nullptr)
    {
        if (currentNode == nullptr || currentNode->key == key)
        {
            return currentNode;
        }

        if (key < currentNode->key)
        {
            return search(key, currentNode->left);
        }
        else
        {
            return search(key, currentNode->right);
        }
    }

    void displayRoot()
    {
        if (root)
        {
            std::cout << root->key << std::endl;
        }
        else
        {
            std::cout << "Tree is empty" << std::endl;
        }
    }

    void inorder(Node *currentNode = nullptr)
    {
        if (currentNode)
        {
            inorder(currentNode->left);
            std::cout << currentNode->key << " ";
            inorder(currentNode->right);
        }
    }

    void preorder(Node *currentNode = nullptr)
    {
        if (currentNode)
        {
            std::cout << currentNode->key << " ";
            preorder(currentNode->left);
            preorder(currentNode->right);
        }
    }

    void postorder(Node *currentNode = nullptr)
    {
        if (currentNode)
        {
            postorder(currentNode->left);
            postorder(currentNode->right);
            std::cout << currentNode->key << " ";
        }
    }
};

int main()
{
    BinarySearchTree bst(45);

    bst.insert(13, bst.root);
    bst.insert(16, bst.root);
    bst.insert(8, bst.root);
    bst.insert(65, bst.root);
    bst.insert(55, bst.root);
    bst.insert(40, bst.root);
    bst.insert(19, bst.root);

    std::cout << "Preorder traversal list   : ";
    bst.preorder(bst.root);
    std::cout << std::endl;

    std::cout << "Postorder traversal list  : ";
    bst.postorder(bst.root);
    std::cout << std::endl;

    std::cout << "Inorder traversal list    : ";
    bst.inorder(bst.root);
    std::cout << std::endl;

    int elementToSearch;
    std::cout << "Enter an element to search in the tree: ";
    std::cin >> elementToSearch;

    if (bst.search(elementToSearch, bst.root))
    {
        std::cout << "Element " << elementToSearch << " is present in the list" << std::endl;
    }
    else
    {
        std::cout << "Element " << elementToSearch << " is not present in the list" << std::endl;
    }

    return 0;
}
