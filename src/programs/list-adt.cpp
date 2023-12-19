#include <iostream>
#include <vector>

class Stack
{
private:
    std::vector<int> items;

public:
    bool is_empty()
    {
        return items.empty();
    }

    void push(int item)
    {
        items.push_back(item);
    }

    int pop()
    {
        if (!is_empty())
        {
            int popped = items.back();
            items.pop_back();
            return popped;
        }
        else
        {
            throw std::out_of_range("pop from an empty stack");
        }
    }

    int peek()
    {
        if (!is_empty())
        {
            return items.back();
        }
        else
        {
            throw std::out_of_range("peek from an empty stack");
        }
    }

    size_t size()
    {
        return items.size();
    }
};

// Example usage:
int main()
{
    Stack stack;
    stack.push(1);
    stack.push(2);
    std::cout << "Stack size: " << stack.size() << std::endl;
    std::cout << "Popped item: " << stack.pop() << std::endl;
    std::cout << "Peeked item: " << stack.peek() << std::endl;
    std::cout << "Stack size: " << stack.size() << std::endl;

    return 0;
}
