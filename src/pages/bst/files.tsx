export const cppFileText: string = `// C++ Program for binary search tree

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
`;

export const pyFileText: string = `# Python Program for binary search tree

# Author: Aditya Godse (https://github.com/adimail)

class Node:
    def __init__(self, key) -> None:
        self.key = key
        self.right = None
        self.left = None


class BinarySearchTree:

    def __init__(self, key):
        self.root = Node(key)
        self.preorder_list = []
        self.postorder_list = []
        self.inorder_list = []
        self.leafNodes = 0
        self.height = 0

    def insert(self, key, current_node=None):
        if current_node is None:
            return Node(key)

        if key < current_node.key:
            current_node.left = self.insert(
                key, current_node.left) if current_node.left else Node(key)
        elif key > current_node.key:
            current_node.right = self.insert(
                key, current_node.right) if current_node.right else Node(key)

        return current_node

    def search(self, key, current_node=None):
        if current_node is None or current_node.key == key:
            return current_node

        if key < current_node.key:
            return self.search(key, current_node.left)
        else:
            return self.search(key, current_node.right)

    def DisplayRoot(self):
        if self.root:
            print(self.root.key)
        else:
            print("Tree is empty")

    def Inorder(self, current_node=None):
        # Left -> root -> Right
        if current_node:
            self.Inorder(current_node.left)
            self.inorder_list.append(current_node.key)
            self.Inorder(current_node.right)

        return self.inorder_list

    def Preorder(self, current_node=None):
        # Root -> left -> Right
        if current_node:
            self.preorder_list.append(current_node.key)
            self.Preorder(current_node.left)
            self.Preorder(current_node.right)

        return self.preorder_list

    def Postorder(self, current_node=None):
        # Left-> Right -> Root
        if current_node:
            self.Postorder(current_node.left)
            self.Postorder(current_node.right)
            self.postorder_list.append(current_node.key)

        return self.postorder_list


bst = BinarySearchTree(45)

bst.insert(13, bst.root)
bst.insert(16, bst.root)
bst.insert(8, bst.root)
bst.insert(65, bst.root)
bst.insert(55, bst.root)
bst.insert(40, bst.root)
bst.insert(19, bst.root)

print("Preorder traversal list   : ", bst.Preorder(bst.root))
print("Postorder traversal list  : ", bst.Postorder(bst.root))
print("Inorder traversal list    : ", bst.Inorder(bst.root))

element_to_search_in_bst = int(
    input("Enter an element to search in the tree: "))

if (bst.search(element_to_search_in_bst, bst.root)):
    print(f"Element {element_to_search_in_bst} is present in the list")
else:
    print(f"Element {element_to_search_in_bst} is not present in the list")
`;
