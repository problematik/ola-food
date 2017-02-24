import _ from 'lodash';
import Entries from 'src/components/menu/Entries';

const dishes = [
  {
    id: 1,
    restaurant_id: 1,
    name: 'first',
    description: 'second',
    price: 1,
  },
  {
    id: 2,
    restaurant_id: 1,
    name: 'third',
    description: 'forth',
    price: 2,
  },
  {
    id: 3,
    restaurant_id: 2,
    name: 'first',
    description: 'fifth',
    price: 575,
  },
  {
    id: 4,
    restaurant_id: 2,
    name: 'fifth',
    description: 'sixth',
    price: 1,
  },
  {
    id: 5,
    restaurant_id: 3,
    name: 'eight',
    description: 'third',
    price: 100,
  },
  {
    id: 6,
    restaurant_id: 4,
    name: 'almost last',
    description: 'description',
    price: 100,
  },
  {
    id: 7,
    restaurant_id: 4,
    name: 'last',
    description: 'yes',
    price: 100,
  },
];

const menus = {
  monday: [
    {
      restaurant_id: 1,
      menus: [
        {
          name: 'Lunch 1',
          dishes: [
            1,
            2,
          ],
        },
      ],
    },
  ],
  tuesday: [
    {
      restaurant_id: 3,
      menus: [
        {
          name: 'Lunch 2',
          dishes: [
            5,
          ],
        },
      ],
    },
  ],
  wednesday: [
    {
      restaurant_id: 4,
      menus: [
        {
          name: 'Lunch 1',
          dishes: [
            6,
          ],
        },
        {
          name: 'Lunch 2',
          dishes: [
            7,
          ],
        },
      ],
    },
  ],
};

const SHOW_ALL = 2;
const SHOW_MENU = 1;
const SHOW_PERMANENT = 0;

describe('Entries.js', () => {
  it('gets 0 dishes if no restaurant is opened', () => {
    const entries = new Entries(dishes, {}, [], 'monday');

    expect(entries.getAllEntries().size).to.equal(0);
  });

  it('sets the keys of opened restaurants even if they have no dishes', () => {
    const entries = new Entries(dishes, {}, [1, 2, 3, 8, 9, 10], 'monday');
    const fetchedEntries = entries.getAllEntries();
    expect(fetchedEntries.size).to.equal(6);

    expect(fetchedEntries.get(1)).to.not.equal(undefined);
    expect(fetchedEntries.get(2)).to.not.equal(undefined);
    expect(fetchedEntries.get(3)).to.not.equal(undefined);
    expect(fetchedEntries.get(4)).to.equal(undefined);
    expect(fetchedEntries.get(5)).to.equal(undefined);
    expect(fetchedEntries.get(6)).to.equal(undefined);
    expect(fetchedEntries.get(7)).to.equal(undefined);
    expect(fetchedEntries.get(8)).to.not.equal(undefined);
    expect(fetchedEntries.get(9)).to.not.equal(undefined);
    expect(fetchedEntries.get(10)).to.not.equal(undefined);
  });

  it('gets the correct number of entries for opened restaurants', () => {
    const entries = new Entries(dishes, {}, [3], 'monday');
    const fetchedEntries = entries.getAllEntries();

    expect(fetchedEntries.size).to.equal(1);
    expect(fetchedEntries.get(3).length).to.equal(1);

    const entries2 = new Entries(dishes, {}, [1, 3], 'tuesday');
    const fetchedEntries2 = entries2.getAllEntries();
    expect(fetchedEntries2.size).to.equal(2);
    expect(fetchedEntries2.get(1).length).to.equal(2);
    expect(fetchedEntries2.get(3).length).to.equal(1);
  });

  it('gets the correct number of entries when menus are added', () => {
    const entries = new Entries(dishes, menus, [1, 2, 3], 'monday');
    const fetchedEntries = entries.getAllEntries();

    expect(fetchedEntries.get(1).length).to.equal(1);
    expect(fetchedEntries.get(2).length).to.equal(2);
    expect(fetchedEntries.get(3).length).to.equal(1);

    const entries2 = new Entries(dishes, menus, [1, 2, 3], 'tuesday');
    const fetchedEntries2 = entries2.getAllEntries();

    expect(fetchedEntries2.get(1).length).to.equal(2);
    expect(fetchedEntries2.get(2).length).to.equal(2);
    expect(fetchedEntries2.get(3).length).to.equal(1);
  });

  it('correctly sets the menu entries dishes', () => {
    const entries = new Entries(dishes, menus, [1, 2, 3], 'monday');
    const fetchedEntries = entries.getMenuEntries();

    expect(fetchedEntries.get(1)[0].name).to.equal('Lunch 1');
    const ids = _.map(fetchedEntries.get(1)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(1);
    expect(ids[1]).to.equal(2);

    const entries2 = new Entries(dishes, menus, [1, 2, 3], 'tuesday');
    const fetchedEntries2 = entries2.getMenuEntries();

    expect(fetchedEntries2.get(3)[0].name).to.equal('Lunch 2');
    const ids2 = _.map(fetchedEntries2.get(3)[0].dishes, dish => dish.id);
    expect(ids2[0]).to.equal(5);
  });

  it('entries name will default to dish name if not an menu entry', () => {
    const entries = new Entries(dishes, menus, [1, 2, 3], 'monday');
    const fetchedEntries = entries.getAllEntries();

    expect(fetchedEntries.get(2)[0].name).to.equal('first');
    expect(fetchedEntries.get(2)[1].name).to.equal('fifth');
    expect(fetchedEntries.get(3)[0].name).to.equal('eight');
  });

  it('correctly gets just the menu entries', () => {
    const entries = new Entries(dishes, menus, [1, 2, 3], 'monday');
    const fetchedEntries = entries.getMenuEntries();

    expect(fetchedEntries.size).to.equal(3);
    expect(fetchedEntries.get(1).length).to.equal(1);
    expect(fetchedEntries.get(2).length).to.equal(0);
    expect(fetchedEntries.get(3).length).to.equal(0);
  });

  it('menus entries are marked as such', () => {
    const entries = new Entries(dishes, menus, [1, 2, 3], 'monday');
    const fetchedEntries = entries.getMenuEntries();
    expect(fetchedEntries.get(1)[0].menuEntry).to.equal(true);
  });

  it('correctly gets the permanent dishes if no menus are present', () => {
    const entries = new Entries(dishes, {}, [1, 2, 3], 'monday');
    const fetchedEntries = entries.getPermanentEntries();

    expect(fetchedEntries.get(1).length).to.equal(2);
    expect(fetchedEntries.get(2).length).to.equal(2);
    expect(fetchedEntries.get(3).length).to.equal(1);

    const entries2 = new Entries(dishes, {}, [1, 2, 3], 'tuesday');
    const fetchedEntries2 = entries2.getPermanentEntries();

    expect(fetchedEntries2.get(1).length).to.equal(2);
    expect(fetchedEntries2.get(2).length).to.equal(2);
    expect(fetchedEntries2.get(3).length).to.equal(1);
  });

  it('correctly gets the permanent dishes if menus are present', () => {
    const entries = new Entries(dishes, menus, [1, 2, 3], 'monday');
    const fetchedEntries = entries.getPermanentEntries();

    expect(fetchedEntries.get(1).length).to.equal(0);
    expect(fetchedEntries.get(2).length).to.equal(2);
    expect(fetchedEntries.get(3).length).to.equal(1);

    const entries2 = new Entries(dishes, menus, [1, 2, 3], 'tuesday');
    const fetchedEntries2 = entries2.getPermanentEntries();

    expect(fetchedEntries2.get(1).length).to.equal(2);
    expect(fetchedEntries2.get(2).length).to.equal(2);
    expect(fetchedEntries2.get(3).length).to.equal(0);
  });

  it('all data is shown on default filter', () => {
    const entries = new Entries(dishes, {}, [1, 2, 3], 'monday');

    const fetchedEntries = entries.filter('', 2);
    expect(fetchedEntries.get(1).length).to.equal(2);
    expect(fetchedEntries.get(2).length).to.equal(2);
    expect(fetchedEntries.get(3).length).to.equal(1);
  });

  it('it will filter entries based on text filter', () => {
    const entries = new Entries(dishes, {}, [1, 2, 3], 'monday');

    let fetchedEntries = entries.filter('first', SHOW_ALL);
    expect(fetchedEntries.get(1).length).to.equal(1);
    expect(fetchedEntries.get(2).length).to.equal(1);
    expect(fetchedEntries.get(3).length).to.equal(0);

    let ids = _.map(fetchedEntries.get(1)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(1);
    ids = _.map(fetchedEntries.get(2)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(3);

    fetchedEntries = entries.filter('third', SHOW_ALL);
    expect(fetchedEntries.get(1).length).to.equal(1);
    expect(fetchedEntries.get(2).length).to.equal(0);
    expect(fetchedEntries.get(3).length).to.equal(1);

    ids = _.map(fetchedEntries.get(1)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(2);
    ids = _.map(fetchedEntries.get(3)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(5);

    fetchedEntries = entries.filter('575', SHOW_ALL);
    expect(fetchedEntries.get(1).length).to.equal(0);
    expect(fetchedEntries.get(2).length).to.equal(1);
    expect(fetchedEntries.get(3).length).to.equal(0);

    ids = _.map(fetchedEntries.get(2)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(3);
  });

  it('it will filter entries based on text filter and toggle type', () => {
    const entries = new Entries(dishes, menus, [1, 2, 3, 4], 'wednesday');

    let fetchedEntries = entries.filter('', SHOW_MENU);
    expect(fetchedEntries.get(1).length).to.equal(0);
    expect(fetchedEntries.get(2).length).to.equal(0);
    expect(fetchedEntries.get(3).length).to.equal(0);
    expect(fetchedEntries.get(4).length).to.equal(2);

    fetchedEntries = entries.filter('lunch 1', SHOW_MENU);
    expect(fetchedEntries.get(1).length).to.equal(0);
    expect(fetchedEntries.get(2).length).to.equal(0);
    expect(fetchedEntries.get(3).length).to.equal(0);
    expect(fetchedEntries.get(4).length).to.equal(1);

    let ids = _.map(fetchedEntries.get(4)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(6);

    fetchedEntries = entries.filter('lunch 2', SHOW_MENU);
    expect(fetchedEntries.get(1).length).to.equal(0);
    expect(fetchedEntries.get(2).length).to.equal(0);
    expect(fetchedEntries.get(3).length).to.equal(0);
    expect(fetchedEntries.get(4).length).to.equal(1);

    ids = _.map(fetchedEntries.get(4)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(7);

    fetchedEntries = entries.filter('', SHOW_PERMANENT);
    expect(fetchedEntries.get(1).length).to.equal(2);
    expect(fetchedEntries.get(2).length).to.equal(2);
    expect(fetchedEntries.get(3).length).to.equal(1);
    expect(fetchedEntries.get(4).length).to.equal(0);

    fetchedEntries = entries.filter('third', SHOW_PERMANENT);
    expect(fetchedEntries.get(1).length).to.equal(1);
    expect(fetchedEntries.get(2).length).to.equal(0);
    expect(fetchedEntries.get(3).length).to.equal(1);
    expect(fetchedEntries.get(4).length).to.equal(0);

    ids = _.map(fetchedEntries.get(1)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(2);

    ids = _.map(fetchedEntries.get(3)[0].dishes, dish => dish.id);
    expect(ids[0]).to.equal(5);
  });
});
