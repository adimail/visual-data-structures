export const cppFileText: string = `
// This is a complete manu driven file for creating linked lists.
// You can create linked list of any type and can store any
// data (int, float, character, string) in the list
// Copy the code and try for yourself

// Author: Aditya Godse (https://github.com/adimail)

#include <iostream>
#include <string>
#include <conio.h>
#include <typeinfo>
#include <sstream>

using std::cin;
using std::cout;
using std::endl;
using std::string;

// structure for a single node in a singly linked list
template <typename T>
struct singleNode
{
    T data;
    singleNode *next;

    singleNode(const T value) : data(value), next(nullptr) {}
};

// structure for a single node in a doubly linked list
template <typename T>
struct doubleNode
{
    doubleNode *previous;
    doubleNode *next;
    T data;

    doubleNode(const T value) : previous(nullptr), next(nullptr), data(value) {}
};

// structure for a single node in a singly circular linked list
template <typename T>
struct circularNode
{
    T data;
    circularNode *next;

    circularNode(const T value) : data(value), next(nullptr) {}
};

// Namespace for linked list operations
namespace ll
{
    template <typename T>
    class singleLinkedList
    {
    private:
        singleNode<T> *head;

    public:
        singleLinkedList() : head(nullptr) {}
        ~singleLinkedList()
        {
            while (head != nullptr)
            {
                singleNode<T> *temp = head;
                head = head->next;
                delete temp;
            }
        }

        bool is_empty()
        {
            if (head == nullptr)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        void insertAtStart(const T &data)
        {
            singleNode<T> *newSingleNode = new singleNode<T>(data);
            newSingleNode->next = head;
            head = newSingleNode;
        }

        void insertAtEnd(const T &data)
        {
            singleNode<T> *newSingleNode = new singleNode<T>(data);

            if (head == nullptr)
            {
                head = newSingleNode;
            }
            else
            {
                singleNode<T> *current = head;

                while (current->next != nullptr)
                {
                    current = current->next;
                }

                current->next = newSingleNode;
            }
        }

        void insertafter(const T &index, const T &data)
        {
            singleNode<T> *newnode = new singleNode<T>(data);
            singleNode<T> *current = head;

            if (head == nullptr)
            {
                cout << "List is empty" << endl;
                return;
            }

            while (current != nullptr)
            {
                if (current->data == index)
                {
                    newnode->next = current->next;
                    current->next = newnode;
                    return;
                }
                current = current->next;
            }

            cout << "The element " << index << " is not present in the list" << endl;
        }

        int length()
        {
            int count = 0;

            singleNode<T> *current = head;

            while (current != nullptr)
            {
                count++;
                current = current->next;
            }

            return count;
        }

        void deleteNode(const T &data)
        {
            if (head == nullptr)
            {
                cout << "List is empty, cannot delete" << endl;
                return;
            }

            if (head->data == data)
            {
                singleNode<T> *temp = head;
                head = head->next;
                delete temp;
                return;
            }

            singleNode<T> *current = head;
            while (current->next != nullptr)
            {
                if (current->next->data == data)
                {
                    singleNode<T> *temp = current->next;
                    current->next = current->next->next;
                    delete temp;
                    return;
                }

                current = current->next;
            }

            cout << "Element " << data << " not found in the list. Deletion failed." << endl;
        }

        void displaylist()
        {
            singleNode<T> *current = head;
            if (length() != 0)
            {
                cout << "(Head)-> ";
                while (current != nullptr)
                {
                    cout << current->data << " ";
                    current = current->next;
                    if (current != nullptr)
                    {
                        cout << " -> ";
                    }
                }
                cout << "->(tail)";
                cout << endl;
            }
            else
            {
                cout << "List is empty" << endl;
            }
        }

        bool search(const T &data)
        {

            if (head == nullptr)
            {
                cout << "List is empty" << endl;
                return false;
            }

            singleNode<T> *current = head;

            while (current != nullptr)
            {
                if (current->data == data)
                {
                    return true;
                }

                current = current->next;
            }

            return false;
        }

        void reverse()
        {
            singleNode<T> *previous = nullptr;
            singleNode<T> *current = head;
            singleNode<T> *m_next = nullptr;

            while (current != nullptr)
            {
                m_next = current->next;
                current->next = previous;
                previous = current;
                current = m_next;
            }

            head = previous;
        }
    };

    template <typename T>
    class doubleLinkedList
    {
    private:
        doubleNode<T> *head;

    public:
        doubleLinkedList() : head(nullptr) {}
        ~doubleLinkedList()
        {
            while (head != nullptr)
            {
                doubleNode<T> *temp = head;
                head = head->next;
                delete temp;
            }
        }

        bool is_empty()
        {
            if (head == nullptr)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        void insertAtStart(const T &data)
        {
            doubleNode<T> *newNode = new doubleNode<T>(data);
            if (head != nullptr)
            {
                newNode->next = head;
                head->previous = newNode;
            }
            head = newNode;
        }

        void insertAtEnd(const T &data)
        {
            doubleNode<T> *newnode = new doubleNode<T>(data);

            if (head == nullptr)
            {
                head = newnode;
            }
            else
            {
                doubleNode<T> *current = head;

                while (current->next != nullptr)
                {
                    current = current->next;
                }

                current->next = newnode;
                newnode->previous = current;
            }
        }

        void insertafter(const T &index, const T &data)
        {
            doubleNode<T> *newnode = new doubleNode<T>(data);
            doubleNode<T> *current = head;

            if (head == nullptr)
            {
                cout << "List is empty" << endl;
                return;
            }

            while (current != nullptr)
            {
                if (current->data == index)
                {
                    newnode->next = current->next;
                    newnode->previous = current;
                    current->next = newnode;
                    return;
                }
                current = current->next;
            }

            cout << "Element " << index << " not found in list" << endl;
        }

        int length()
        {
            int count = 0;
            doubleNode<T> *current = head;
            while (current != nullptr)
            {
                count++;
                current = current->next;
            }

            return count;
        }

        void reverse()
        {
            doubleNode<T> *current = head;
            doubleNode<T> *temp = nullptr;

            while (current != nullptr)
            {
                temp = current->previous;
                current->previous = current->next;
                current->next = temp;

                current = current->previous;
            }

            if (temp != nullptr)
            {
                head = temp->previous;
            }
        }

        void deleteNode(const T &data)
        {
            if (head == nullptr)
            {
                cout << "List is empty, cannot delete" << endl;
                return;
            }

            if (head->data == data)
            {
                doubleNode<T> *temp = head;
                head = head->next;
                delete temp;
                return;
            }

            doubleNode<T> *current = head;
            while (current->next != nullptr)
            {
                if (current->next->data == data)
                {
                    doubleNode<T> *temp = current->next;
                    current->next = current->next->next;
                    current->previous = current->previous->previous;
                    delete temp;
                    return;
                }

                current = current->next;
            }

            cout << "Element " << data << " not found in the list. Deletion failed." << endl;
        }

        bool search(const T &data)
        {

            if (head == nullptr)
            {
                cout << "List is empty!" << endl;
                return false;
            }

            doubleNode<T> *current = head;

            while (current != nullptr)
            {
                if (current->data == data)
                {
                    return true;
                }

                current = current->next;
            }

            return false;
        }

        void displaylist()
        {
            doubleNode<T> *current = head;
            if (length() != 0)
            {
                cout << "(head)<->  ";
                while (current != nullptr)
                {
                    cout << current->data << " ";
                    current = current->next;
                    if (current != nullptr)
                    {
                        cout << " <->  ";
                    }
                }
                cout << "<->(tail)";
                cout << endl;
            }
            else
            {
                cout << "List is empty" << endl;
            }
        }
    };

    template <typename T>
    class singleCircularLinkedList
    {
    private:
        circularNode<T> *head;

    public:
        singleCircularLinkedList() : head(nullptr) {}
        ~singleCircularLinkedList()
        {
            if (head == nullptr)
                return;

            circularNode<T> *current = head;
            circularNode<T> *temp = nullptr;

            do
            {
                temp = current;
                current = current->next;
                delete temp;
            } while (current != head);
        }

        bool is_empty()
        {
            return head == nullptr;
        }

        void insertAtStart(const T &data)
        {
            circularNode<T> *newSingleNode = new circularNode<T>(data);
            if (head == nullptr)
            {
                newSingleNode->next = newSingleNode;
                head = newSingleNode;
            }
            else
            {
                circularNode<T> *temp = head;
                while (temp->next != head)
                {
                    temp = temp->next;
                }
                temp->next = newSingleNode;
                newSingleNode->next = head;
                head = newSingleNode;
            }
        }

        void insertAtEnd(const T &data)
        {
            circularNode<T> *newSingleNode = new circularNode<T>(data);

            if (head == nullptr)
            {
                newSingleNode->next = newSingleNode;
                head = newSingleNode;
            }
            else
            {
                circularNode<T> *temp = head;
                while (temp->next != head)
                {
                    temp = temp->next;
                }
                temp->next = newSingleNode;
                newSingleNode->next = head;
            }
        }

        void insertafter(const T &index, const T &data)
        {
            circularNode<T> *newnode = new circularNode<T>(data);
            if (head == nullptr)
            {
                cout << "List is empty" << endl;
                return;
            }

            circularNode<T> *current = head;

            do
            {
                if (current->data == index)
                {
                    newnode->next = current->next;
                    current->next = newnode;
                    return;
                }
                current = current->next;
            } while (current != head);

            cout << "The element " << index << " is not present in the list" << endl;
        }

        int length()
        {
            int count = 0;
            circularNode<T> *current = head;

            if (head == nullptr)
            {
                return count;
            }

            do
            {
                count++;
                current = current->next;
            } while (current != head);

            return count;
        }

        void deleteNode(const T &data)
        {
            if (head == nullptr)
            {
                cout << "List is empty, cannot delete" << endl;
                return;
            }

            if (head->data == data)
            {
                circularNode<T> *temp = head;
                if (head->next == head)
                {
                    head = nullptr;
                }
                else
                {
                    circularNode<T> *current = head;
                    while (current->next != head)
                    {
                        current = current->next;
                    }
                    head = head->next;
                    current->next = head;
                }
                delete temp;
                return;
            }

            circularNode<T> *current = head;
            while (current->next != head)
            {
                if (current->next->data == data)
                {
                    circularNode<T> *temp = current->next;
                    current->next = current->next->next;
                    delete temp;
                    return;
                }
                current = current->next;
            }

            cout << "Element " << data << " not found in the list. Deletion failed." << endl;
        }

        void displaylist()
        {
            circularNode<T> *current = head;

            if (head == nullptr)
            {
                cout << "List is empty" << endl;
                return;
            }

            do
            {
                cout << current->data << " -> ";
                current = current->next;
            } while (current != head);

            cout << " (Head)" << endl;
        }

        bool search(const T &data)
        {
            if (head == nullptr)
            {
                cout << "List is empty" << endl;
                return false;
            }

            circularNode<T> *current = head;

            do
            {
                if (current->data == data)
                {
                    return true;
                }
                current = current->next;
            } while (current != head);

            return false;
        }

        void reverse()
        {
            if (head == nullptr)
            {
                cout << "List is empty" << endl;
                return;
            }

            circularNode<T> *prev = nullptr;
            circularNode<T> *current = head;
            circularNode<T> *next = nullptr;

            do
            {
                next = current->next;
                current->next = prev;
                prev = current;
                current = next;
            } while (current != head);

            head->next = prev;
            head = prev;
        }
    };

}

// Code snippets for console window
class menu
{
public:
    void portal()
    {
        system("cls");
        cout << "--------------------------------------------------------" << endl;
        cout << "            Welcome to the List ADT portal" << endl;
        cout << "--------------------------------------------------------" << endl;
    }

    void header()
    {
        system("cls");
        cout << "--------------------------------------------------------" << endl;
        cout << "                   List ADT portal" << endl;
        cout << "--------------------------------------------------------" << endl;
    }

    int user_ip(int min, int max)
    {
        int choice;

        cout << endl
             << "--------------------------------------------------------" << endl;
        cout << "Your choice: ";

        while (true)
        {
            cin >> choice;

            if (choice >= min && choice <= max)
            {
                return choice;
            }
            else
            {
                cout << "Invalid choice. ";
                cout << "Input must be in the range of " << min << " and " << max << endl;
                cout << "Your choice: ";
            }
        }
    }

    int init()
    {
        int choice;

        cout << "1> Create a singly linked list" << endl;
        cout << "2> Create a doubly linked list" << endl;
        cout << "3> Create a circular singly linked list" << endl;

        return user_ip(1, 3);
    }

    int d_type()
    {
        int choice;

        cout << "What type of data would you like to store in your linked list\n\n";

        cout << "1> Integer linked list" << endl;
        cout << "2> float linked list" << endl;
        cout << "3> Character linked list" << endl;
        cout << "4> string linked list" << endl;

        return user_ip(1, 4);
    }

    int operation()
    {
        int choice;

        cout << "1> Add element at the beginning of the linked list" << endl;
        cout << "2> Add element at the end of the linked list" << endl;
        cout << "3> Add element after a specific valuein the  linked list" << endl;
        cout << "4> Remove an element from the linked list" << endl;
        cout << "5> Find the length of the linked list" << endl;
        cout << "6> Reverse the linked list" << endl;
        cout << "7> Search an element in the list" << endl;
        cout << "8> Display the entire linked list" << endl;

        cout << "0> Exit" << endl;

        return user_ip(0, 8);
    }
};

// contains validate function that checks for a input datatype and returns a boolen value if
// input data type is equal to the specified flag data type. Flags:
// falg 1: Integer
// falg 2: float
// falg 3: characher
// falg 4: std::string

class inputValidations
{
public:
    bool validate(int flag, const void *data)
    {
        if (flag < 1 || flag > 4)
        {
            std::cout << "Invalid flag. Please use a flag between 1 and 4." << std::endl;
            return false;
        }

        switch (flag)
        {
        case 1: // flag is integer
            if (isInteger(*static_cast<const std::string *>(data)))
            {
                return true;
            }
            break;

        case 2: // flag is float
            if (isFloat(*static_cast<const std::string *>(data)))
            {
                return true;
            }
            break;

        case 3: // flag is character
            if (isChar(*static_cast<const std::string *>(data)))
            {
                return true;
            }
            break;

        case 4: // flag is string
            if (isString(*static_cast<const std::string *>(data)))
            {
                return true;
            }
            break;
        }

        return false;
    }

    bool isInteger(const std::string &str)
    {
        std::istringstream ss(str);
        int value;
        return (ss >> value) && ss.eof();
    }

    bool isFloat(const std::string &str)
    {
        std::istringstream ss(str);
        float value;
        return (ss >> value) && ss.eof();
    }

    bool isChar(const std::string &str)
    {
        return str.length() == 1;
    }

    bool isString(const std::string &str)
    {
        return true;
    }
};

template <typename T, typename ListType>
bool generalListOperations(ListType &userlist, int choice)
{
    T data, index;

    switch (choice)
    {
    case 1:
        cout << "Enter the data to insert at the beginning: ";
        cin >> data;
        userlist.insertAtStart(data);
        cout << "\n\nYour List: " << endl;
        userlist.displaylist();
        getch();
        system("cls");
        return true;
        break;

    case 2:
        cout << "Enter the data to insert at the end: ";
        cin >> data;
        userlist.insertAtEnd(data);
        cout << "\n\nYour List: " << endl;
        userlist.displaylist();
        getch();
        system("cls");
        return true;
        break;

    case 3:

        if (userlist.is_empty())
        {
            cout << "The list is empty, add elements to do this operation" << endl;
            getch();
            break;
            return true;
        }
        else
        {
            cout << "Enter the element after which you want to insert another element: ";
            cin >> index;
            cout << "Enter data to insert: ";
            cin >> data;
            userlist.insertafter(index, data);
            cout << "\n\nYour List: " << endl;
            userlist.displaylist();
            getch();
            system("cls");
            return true;
            break;
        }

    case 4:
        cout << "Enter the element to delete from the list: ";
        cin >> data;
        userlist.deleteNode(data);
        cout << "\n\nYour List: " << endl;
        userlist.displaylist();
        getch();
        system("cls");
        return true;
        break;

    case 5:
        cout << "The list contains " << userlist.length() << " elements.";
        cout << "\n\nYour List: " << endl;
        userlist.displaylist();
        getch();
        system("cls");
        return true;
        break;

    case 6:
        userlist.displaylist();
        userlist.reverse();
        cout << "\nYour List after reversing: " << endl;
        userlist.displaylist();
        getch();
        system("cls");
        return true;
        break;

    case 7:
        cout << "Enter the element to search in the list: ";
        cin >> data;

        if (userlist.search(data))
        {
            cout << "Element found in the list";
        }
        else
        {
            cout << "Element not found in the list";
        }

        cout << "\n\nYour List: " << endl;
        userlist.displaylist();
        getch();
        system("cls");
        return true;
        break;

    case 8:
        cout << "\n\nYour List: " << endl;
        userlist.displaylist();
        getch();
        system("cls");
        return true;
        break;

    case 0:
        cout << "Exiting the application. Press any key to close window\n";
        cout << "\n\nMade with <3 by Aditya Godse";
        getch();
        system("cls");
        return false;
        break;

    default:
        system("cls");
        return true;
        break;
    }
}

template <typename T>
void single_list_life(ll::singleLinkedList<T> &userlist, int data_type = 1)
{
    menu program;
    bool lifespan = true;

    while (lifespan)
    {
        program.header();
        int choice = program.operation();
        system("cls");

        lifespan = generalListOperations<T, ll::singleLinkedList<T>>(userlist, choice); // Explicitly specify the template parameters here
    }
}

template <typename T>
void double_list_life(ll::doubleLinkedList<T> &userlist, int data_type = 1)
{
    menu program;
    bool lifespan = true;
    T data, index;

    while (lifespan)
    {
        menu program;
        program.header();
        int choice = program.operation();
        system("cls");

        lifespan = generalListOperations<T, ll::doubleLinkedList<T>>(userlist, choice);
    }
}

template <typename T>
void single_circular_linked_list_life(ll::singleCircularLinkedList<T> &userlist, int data_type = 1)
{
    menu program;
    bool lifespan = true;
    T data, index;
    inputValidations validator;

    while (lifespan)
    {
        program.header();
        int choice = program.operation();
        system("cls");

        lifespan = generalListOperations<T, ll::singleCircularLinkedList<T>>(userlist, choice);
    }
}

int main()
{
    menu program;
    int list_profile, d_type;
    bool life = true;

    ll::singleLinkedList<int> s_user_list_int;
    ll::doubleLinkedList<int> d_user_list_int;
    ll::singleCircularLinkedList<int> sc_user_list_int;
    ll::singleLinkedList<float> s_user_list_float;
    ll::doubleLinkedList<float> d_user_list_float;
    ll::singleCircularLinkedList<float> sc_user_list_float;
    ll::singleLinkedList<char> s_user_list_char;
    ll::doubleLinkedList<char> d_user_list_char;
    ll::singleCircularLinkedList<char> sc_user_list_char;
    ll::singleLinkedList<string> s_user_list_string;
    ll::doubleLinkedList<string> d_user_list_string;
    ll::singleCircularLinkedList<string> sc_user_list_string;

    system("cls");

    program.portal();
    cout << "Press any key to continue...";
    getch();
    program.portal();
    list_profile = program.init();
    program.portal();
    d_type = program.d_type();

    system("cls");
    cout << "Linked list created successfully. Press any key to continue to list operations...";
    getch();

    switch (d_type)
    {
    case 1:
        switch (list_profile)
        {
        case 1:
            single_list_life(s_user_list_int, 1);
            break;

        case 2:
            double_list_life(d_user_list_int, 1);
            break;

        case 3:
            single_circular_linked_list_life(sc_user_list_int, 1);
            break;

        default:
            break;
        }
        break;

    case 2:
        switch (list_profile)
        {
        case 1:
            single_list_life(s_user_list_float);
            break;

        case 2:
            double_list_life(d_user_list_float);
            break;

        case 3:
            single_circular_linked_list_life(sc_user_list_float);
            break;

        default:
            break;
        }
        break;

    case 3:
        switch (list_profile)
        {
        case 1:
            single_list_life(s_user_list_char);
            break;

        case 2:
            double_list_life(d_user_list_char);
            break;

        case 3:
            single_circular_linked_list_life(sc_user_list_char);
            break;

        default:
            break;
        }
        break;

    case 4:
        switch (list_profile)
        {
        case 1:
            single_list_life(s_user_list_string);
            break;

        case 2:
            double_list_life(d_user_list_string);
            break;

        case 3:
            single_circular_linked_list_life(sc_user_list_string);
            break;

        default:
            break;
        }
        break;

    default:
        cout << "Select appropriate option" << endl;
        getch();
        break;
    }
}
`;

export const pyFileText: string = `
class Node:
    def __init__(self, value):
        self.data = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node


# Example usage
my_list = LinkedList()
my_list.append(1)
my_list.append(2)
my_list.append(3)

# Display the linked list elements
current = my_list.head
while current:
    print(current.data, end=" ")
    current = current.next

    `;
